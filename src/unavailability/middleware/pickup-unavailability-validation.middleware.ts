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
    return await this.unavailability.find({
      rentalId: unavailability.rentalId,
      $or: [
        // outside
        {
          'startDateTime.year': unavailability.startDateTime.year,
          'startDateTime.month': { $lte: unavailability.startDateTime.month },
          'startDateTime.day': { $lte: unavailability.startDateTime.day },
          'startDateTime.hour': { $lte: unavailability.startDateTime.hour },
          'startDateTime.minute': { $lte: unavailability.startDateTime.minute },
          'endDateTime.year': unavailability.endDateTime.year,
          'endDateTime.month': { $gte: unavailability.endDateTime.month },
          'endDateTime.day': { $gte: unavailability.endDateTime.day },
          'endDateTime.hour': { $gte: unavailability.endDateTime.hour },
          'endDateTime.minute': { $gte: unavailability.endDateTime.minute },
        },
        // enclosed
        {
          'startDateTime.year': unavailability.startDateTime.year,
          'startDateTime.month': { $gte: unavailability.startDateTime.month },
          'startDateTime.day': { $gte: unavailability.startDateTime.day },
          'startDateTime.hour': { $gte: unavailability.startDateTime.hour },
          'startDateTime.minute': { $gte: unavailability.startDateTime.minute },
          'endDateTime.year': unavailability.endDateTime.year,
          'endDateTime.month': { $lte: unavailability.endDateTime.month },
          'endDateTime.day': { $lte: unavailability.endDateTime.day },
          'endDateTime.hour': { $lte: unavailability.endDateTime.hour },
          'endDateTime.minute': { $lte: unavailability.endDateTime.minute },
        },
        // offset before start
        {
          'startDateTime.year': { $lte: unavailability.startDateTime.year },
          'startDateTime.month': { $lte: unavailability.startDateTime.month },
          'startDateTime.day': { $lte: unavailability.startDateTime.day },
          'startDateTime.hour': { $lte: unavailability.startDateTime.hour },
          'startDateTime.minute': { $lte: unavailability.startDateTime.minute },
          'endDateTime.year': { $gte: unavailability.startDateTime.year, $lte: unavailability.endDateTime.year },
          'endDateTime.month': { $gte: unavailability.startDateTime.month, $lte: unavailability.endDateTime.month },
          'endDateTime.day': { $gte: unavailability.startDateTime.day, $lte: unavailability.endDateTime.day },
          'endDateTime.hour': { $gte: unavailability.startDateTime.hour, $lte: unavailability.endDateTime.hour },
          'endDateTime.minute': { $gte: unavailability.startDateTime.minute, $lte: unavailability.endDateTime.minute }
        },
        // offset after end
        {
          'startDateTime.year': { $lte: unavailability.endDateTime.year },
          'startDateTime.month': { $lte: unavailability.endDateTime.month },
          'startDateTime.day': { $lte: unavailability.endDateTime.day },
          'startDateTime.hour': { $lte: unavailability.endDateTime.hour },
          'startDateTime.minute': { $lte: unavailability.endDateTime.minute },
          'endDateTime.year': { $gte: unavailability.endDateTime.year },
          'endDateTime.month': { $gte: unavailability.endDateTime.month },
          'endDateTime.day': { $gte: unavailability.endDateTime.day },
          'endDateTime.hour': { $gte: unavailability.endDateTime.hour },
          'endDateTime.minute': { $gte: unavailability.endDateTime.minute },
        }
      ]
    });
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
