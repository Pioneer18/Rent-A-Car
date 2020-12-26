import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { unavailabilityModel } from '../../common/Const';
import { Model } from 'mongoose';
import { UnavailabilityModelInterface } from '../interface/unavailability-model.interface';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { LuxonUtil } from '../../common/util/luxon-util';
/**
 * **summary**: 
 */
@Injectable()
export class PickupUnavailabilityValidationMiddleware implements NestMiddleware {
  constructor(
    @Inject(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
    private readonly luxonUtil: LuxonUtil
  ) { }

  /**
   * **summary**: Convert the startDate and endDate to Luxon DateTimes
   * @param unavailability new unavailability data 
   */
  convertToDateTimes = async (unavailability: UnavailabilityDto) => {
    const dates: Date[] =  this.luxonUtil.createJsDate([unavailability.startDate, unavailability.endDate]);
    return await this.luxonUtil.dateToDateTime(dates);
  }

  /**
   * **summary**: Check if the given year is a leap year
   * @param 
   */

  /**
   * **summary**: Validate the requested new unavalability data conforms to the following conditions:
   * - The duration is at least one full day
   * - The duration is no more than a full year (including leap year days)
   * - The start date and time is before the end date and time
   * @param  unavailability new unavailability data
   */
  validateUnavailability = async (unavailability: UnavailabilityDto) => {

  }

  /**
   * **summary**:
   * @param req the request object
   * @param res the response object
   * @param next the next method to continue onto the next handler
   */
  use = async (req: Request, res: Response, next: Function): Promise<void> => {
    // apply only to update-unavailability request
    if (req.originalUrl === '/v1/unavailability/schedule-pickup-unavailability') {
      
    }
    next();
  }
}
