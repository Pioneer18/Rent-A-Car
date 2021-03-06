import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../interface/model/unavailability-model.interface';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { LuxonUtil } from '../../common/util/luxon-util';
import { DateTime } from 'luxon';
import { InjectModel } from '@nestjs/mongoose';
import { unavailabilityModel } from '../../common/Const';
import { RescheduleUnavailabilityDto } from '../dto/reschedule-unavailability.dto';
/**
 * **summary**: Verify the requested new Unavailability does not conflict with Unavailability already scheduled for the selected rental.
 * Also verify the requested new Unavailability has valid data. 
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
  convertToDateTimes = async (unavailability: UnavailabilityDto)/* Promise<DateTime[]>*/ => {
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

  /**
   * **summary** Query the database and check for the 4 conditions of scheduling conflicts.
   * - verify the requested unavailability is 'enclosed' by an existing unavailability
   * - verify the requested unavailability will not 'enclose' an existing unavailability
   * - verify the requested unavailability will not 'overlap' an exsiting unavailability's ending
   * - verify the requested unavailability will not 'overlap' an existing unavailability's start
   * @param unavailability 
   */
  private sendOverlapQuery = async (unavailability: UnavailabilityDto, unavailabiility_id?: string) => {
    const query = {
      rentalId: unavailability.rentalId,
      $or: [
        // #1 Absolutely Enclose the Query
        // year
        {
          $and: [
            { 'startDateTime.year': { $lt: unavailability.startDateTime.year } },
            { 'endDateTime.year': { $gt: unavailability.endDateTime.year } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lt: unavailability.startDateTime.month } },
            { 'endDateTime.month': { $gt: unavailability.endDateTime.month } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lt: unavailability.startDateTime.day } },
            { 'endDateTime.day': { $gt: unavailability.endDateTime.day } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': { $gt: unavailability.endDateTime.hour } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': { $gt: unavailability.endDateTime.minute } }
          ]
        },
        // #2 Absolutely Enclosed by Query
        // year
        {
          $and: [
            { 'startDateTime.year': { $gt: unavailability.startDateTime.year } },
            { 'endDateTime.year': { $lt: unavailability.endDateTime.year } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $gt: unavailability.startDateTime.month } },
            { 'endDateTime.month': { $lt: unavailability.endDateTime.month } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $gt: unavailability.startDateTime.day } },
            { 'endDateTime.day': { $lt: unavailability.endDateTime.day } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $gt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': { $lt: unavailability.endDateTime.hour } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $gt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': { $lt: unavailability.endDateTime.minute } }
          ]
        },
        // #3 Absolutely Equal
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': unavailability.startDateTime.minute },
            { 'endDateTime.minute': unavailability.endDateTime.minute }
          ]
        },
        // #4 Start === Start && End > End : sE <== eQ
        // year
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': { $gt: unavailability.endDateTime.year } },
            { 'startDateTime.month': { $lte: unavailability.endDateTime.month } },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } },
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': { $gt: unavailability.endDateTime.month } },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } },
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': { $gt: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } },
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': { $gt: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } },
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': unavailability.startDateTime.minute },
            { 'endDateTime.minute': { $gt: unavailability.endDateTime.minute } }
          ]
        },
        // #5 Start === Start && End < End: eE >== sQ
        // year
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': { $lt: unavailability.endDateTime.year } },
            { 'endDateTime.month': { $gte: unavailability.startDateTime.month } },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': { $lt: unavailability.endDateTime.month } },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': { $lt: unavailability.endDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': { $lt: unavailability.endDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': unavailability.startDateTime.minute },
            { 'endDateTime.minute': { $lt: unavailability.endDateTime.minute } }
          ]
        },
        // #6  End === End && Start < Start: eE >== sQ
        // year
        {
          $and: [
            { 'startDateTime.year': { $lt: unavailability.startDateTime.year } },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'endDateTime.month': { $gte: unavailability.startDateTime.month } },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lt: unavailability.startDateTime.month } },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lt: unavailability.startDateTime.day } },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': unavailability.endDateTime.minute }
          ]
        },
        // #7 End === End && Start > Start
        // year
        {
          $and: [
            { 'startDateTime.year': { $gt: unavailability.startDateTime.year } },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lte: unavailability.endDateTime.month } },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $gt: unavailability.startDateTime.month } },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $gt: unavailability.startDateTime.day } },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $gt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $gt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': unavailability.endDateTime.minute }
          ]
        },
        // #8 Start < Start && End > Start
        // year
        {
          $and: [
            { 'startDateTime.year': { $lt: unavailability.startDateTime.year } },
            { 'endDateTime.year': { $gt: unavailability.startDateTime.year } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lt: unavailability.startDateTime.month } },
            { 'endDateTime.month': { $gt: unavailability.startDateTime.month } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lt: unavailability.startDateTime.day } },
            { 'endDateTime.day': { $gt: unavailability.startDateTime.day } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': { $gt: unavailability.startDateTime.hour } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': { $gt: unavailability.startDateTime.minute } }
          ]
        },
        // #9 Start < End && End === Start
        // year
        {
          $and: [
            { 'startDateTime.year': { $lt: unavailability.startDateTime.year } },
            { 'endDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.month': { $gte: unavailability.startDateTime.month } },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lt: unavailability.startDateTime.month } },
            { 'endDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.day': { $gte: unavailability.startDateTime.day } },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lt: unavailability.startDateTime.day } },
            { 'endDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.hour': { $gte: unavailability.startDateTime.hour } },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lt: unavailability.startDateTime.hour } },
            { 'endDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.minute': { $gte: unavailability.startDateTime.minute } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lt: unavailability.startDateTime.minute } },
            { 'endDateTime.minute': unavailability.startDateTime.minute }
          ]
        },
        // #10 End > End && Start < End
        // year
        {
          $and: [
            { 'startDateTime.year': { $lt: unavailability.endDateTime.year } },
            { 'endDateTime.year': { $gt: unavailability.endDateTime.year } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': { $lt: unavailability.endDateTime.month } },
            { 'endDateTime.month': { $gt: unavailability.endDateTime.month } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': { $lt: unavailability.endDateTime.day } },
            { 'endDateTime.day': { $gt: unavailability.endDateTime.day } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': { $lt: unavailability.endDateTime.hour } },
            { 'endDateTime.hour': { $gt: unavailability.endDateTime.hour } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': { $lt: unavailability.endDateTime.minute } },
            { 'endDateTime.minute': { $gt: unavailability.endDateTime.minute } }
          ]
        },
        // #11 End > End && Start === End
        // year
        {
          $and: [
            { 'startDateTime.year': unavailability.endDateTime.year },
            { 'endDateTime.year': { $gt: unavailability.endDateTime.year } },
            { 'startDateTime.month': { $lte: unavailability.endDateTime.month } },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // month
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.endDateTime.month },
            { 'endDateTime.month': { $gt: unavailability.endDateTime.month } },
            { 'startDateTime.day': { $lte: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // day
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.endDateTime.day },
            { 'endDateTime.day': { $gt: unavailability.endDateTime.day } },
            { 'startDateTime.hour': { $lte: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // hour
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.endDateTime.hour },
            { 'endDateTime.hour': { $gt: unavailability.endDateTime.hour } },
            { 'startDateTime.minute': { $lte: unavailability.endDateTime.minute } }
          ]
        },
        // minute
        {
          $and: [
            { 'startDateTime.year': unavailability.startDateTime.year },
            { 'endDateTime.year': unavailability.endDateTime.year },
            { 'startDateTime.month': unavailability.startDateTime.month },
            { 'endDateTime.month': unavailability.endDateTime.month },
            { 'startDateTime.day': unavailability.startDateTime.day },
            { 'endDateTime.day': unavailability.endDateTime.day },
            { 'startDateTime.hour': unavailability.startDateTime.hour },
            { 'endDateTime.hour': unavailability.endDateTime.hour },
            { 'startDateTime.minute': unavailability.endDateTime.minute },
            { 'endDateTime.minute': { $gt: unavailability.endDateTime.minute } }
          ]
        }
      ]
    };
    if (unavailabiility_id) {
      // reschedule query
      let reQuery: any = query;
      reQuery._id = { $ne: unavailabiility_id };
      return await this.unavailability.find(reQuery);
    }
    // schedule new query
    return await this.unavailability.find(query);

  }

  /**
   * **summary**: Check the databse for any unavailability that overlaps with the requested new unavailability
   * @param unavailability
   */
  checkForOverlap = async (unavailability: UnavailabilityDto) => {
    const check = await this.sendOverlapQuery(unavailability);
    console.log('MIDDLEWARE CHECK')
    console.log(check)
    if (check.length >= 1) throw new Error(`The requested unavailability will overlap with unavailability already scheduled for this rental: ${unavailability.rentalId}`);
    return;
  }

  checkForRescheduleOverlap = async (unavailability: RescheduleUnavailabilityDto) => {
    const check = await this.sendOverlapQuery(unavailability, unavailability.unavailability_id);
    console.log('MIDDLEWARE RESCHEDULE CHECK');
    console.log(check);
    if (check.length >= 1) throw new Error(`The requested rescheduling will overlap with unavailability already scheduled for this rental: ${unavailability.rentalId}`);
    return;
  }

  /**
   * **summary
   * @param unavailability
   */

  /**
   * **summary**:
   * @param req the request object
   * @param res the response object
   * @param next the next method to continue onto the next handler
   */
  use = async (req: Request, res: Response, next: Function): Promise<void> => {
    // Schedule
    if (req.originalUrl === '/unavailability/schedule-pickup-unavailability') {
      console.log(`VALIDATE UNAVAILABILITY MIDDLEWARE`)
      await this.validateUnavailability(req.body);
      await this.checkForOverlap(req.body);
    }
    // Reschedule
    if (req.originalUrl === '/unavailability/reschedule-pickup-unavailability') {
      if (req.body.unavailability_id) {
        console.log(`VALIDATE RESCHEDULING MIDDLEWARE`);
        const update: UnavailabilityDto = {
          rentalId: req.body.rentalId,
          title: req.body.title,
          startDateTime: req.body.startDateTime,
          endDateTime: req.body.endDateTime
        }
        await this.validateUnavailability(update);
        await this.checkForRescheduleOverlap(req.body)
      }
      else throw new Error('Please provide an Unavailability _id to reschedule');
    }
    next();
  }
}
