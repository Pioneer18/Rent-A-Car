import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../interface/unavailability-model.interface';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { LuxonUtil } from '../../common/util/luxon-util';
import { DateTime } from 'luxon';
import { InjectModel } from '@nestjs/mongoose';
import { unavailabilityModel } from '../../common/Const';
/**
 * **summary**: 
 */
@Injectable()
export class PickupUnavailabilityValidationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
    private readonly luxonUtil: LuxonUtil
  ) { }

  /**
   * **summary**: Convert the startDate and endDate to Luxon DateTimes
   * @param unavailability new unavailability data 
   */
  private convertToDateTimes = async (unavailability: UnavailabilityDto)/* Promise<DateTime[]>*/ => {
    return await this.luxonUtil.objectToDateTime([unavailability.startDateTime, unavailability.endDateTime]);
  }


  /**
   * **summary**: Validate the requested new unavalability data conforms to the following conditions:
   * - The duration is at least one full day
   * - The duration is no more than a full year (including leap year days)
   * - The start date and time is before the end date and time
   * @param  unavailability new unavailability data
   */
  validateUnavailability = async (unavailability: UnavailabilityDto): Promise<void> => {
    const dateTimes: DateTime[] = await this.convertToDateTimes(unavailability);
    const startDate: DateTime = dateTimes[0], endDate: DateTime = dateTimes[1];
    // check if the unavailability is in a leap year
    const days = endDate.diff(startDate, 'days');
    const leapYear = (startDate.isInLeapYear || endDate.isInLeapYear);
    if (days.values.days < 1) throw new Error('Unavailability must be for at least one full day (24 hours)');
    if (days.values.days > 365 && leapYear === false) throw new Error('You cannot schedule over a single Unavailability for more than a years duration');
    if (days.values.days > 366 && leapYear === true) throw new Error('You cannot schedule over a single Unavailability for more than a years duration')
    if (startDate < endDate === false) throw new Error('The start date and time must be before the end date and time');
    if (unavailability.title == null || typeof unavailability.title !== 'string') throw new Error('title must be a string')
    if (unavailability.rentalId == null || typeof unavailability.title !== 'string') throw new Error('rentalId must be a string')
    return;
  }

  private sendOverlapQuery = async (unavailability: UnavailabilityDto) => {
    return await this.unavailability.find({rentalId: unavailability.rentalId})
      .where('startDateTime.year').equals(unavailability.startDateTime.year)
      .where('startDateTime.month').gte(unavailability.startDateTime.month)
      .where('startDateTime.day').gte(unavailability.startDateTime.day)
      .where('startDateTime.hour').gte(unavailability.startDateTime.hour)
      .where('startDateTime.minute').gte(unavailability.startDateTime.minute)
      .where('endDateTime.year').equals(unavailability.endDateTime.year)
      .where('endDateTime.month').lte(unavailability.endDateTime.month)
      .where('endDateTime.day').lte(unavailability.endDateTime.day)
      .where('endDateTime.hour').lte(unavailability.endDateTime.hour)
      .where('endDateTime.minute').lte(unavailability.endDateTime.minute)
  }

  /**
   * **summary**: Check the databse for any unavailability that overlaps with the requested new unavailability
   * @param unavailability
   */
  checkForOverlap = async (unavailability: UnavailabilityDto) => {
    const check = await this.sendOverlapQuery(unavailability);
    console.log('MIDDLEWARE CHECK')
    console.log(check)
    if (check.length >= 1) throw new Error('The requested unavailability will overlap with unavailability already in the database');
    return;
  }

  /**
   * **summary**:
   * @param req the request object
   * @param res the response object
   * @param next the next method to continue onto the next handler
   */
  use = async (req: Request, res: Response, next: Function): Promise<void> => {
    // apply only to update-unavailability request
    if (req.originalUrl === '/unavailability/schedule-pickup-unavailability') {
      console.log(`VALIDATE UNAVAILABILITY MIDDLEWARE`)
      await this.validateUnavailability(req.body);
      await this.checkForOverlap(req.body)
    }
    next();
  }
}
