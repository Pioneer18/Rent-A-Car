/*import { Injectable, Inject, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { unavailabilityModel } from '../../common/Const';
import { Model } from 'mongoose';
// import { UnavailabilityModelInterface } from '../interface/modelInterface/Unavailability/unavailability.model.interface';
import { ValidateUpdateUnavailabilityDto } from '../dto/unavailability/update/validate-update-unavailability.dto';
import { CalculateRangeDto } from '../../unavailability/dto/calculate-range.dto';
import { UnavailabilityModelInterface } from '../../unavailability/interface/unavailability-model.interface';

 * **summary**: validate that incoming request to update a rental's already scheduled Unavailability. Validate that the expected # of unavailability docs are present in the database
 
@Injectable()
export class ValidateUpdateUnavailabilityMiddleware implements NestMiddleware {
  constructor(
    // @Inject(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
  ) { }

   * **summary**: calculate the [**range**](https://www.mathsisfun.com/data/range.html) of the requested Unavailability to update for the Rental
   * @param y1 the start and end day of the first year that the Unavailability is scheduled across
   * @param y2 the start and end day of the second yaer that the Unavailability is scheduled across; if there is a second year
   
  private calculateRange = async (data: CalculateRangeDto) => {
    if (data.y2 !== null) {
      // calculate range for 2 years
      let temp1: number;
      let temp2: number;
      data.y1.sD === data.y1.eD ? temp1 = 1 : temp1 = data.y1.eD - data.y1.sD + 1;
      data.y2.sD === data.y2.eD ? temp2 = 1 : temp2 = data.y2.eD - data.y2.sD + 1;
      return { range: temp1 + temp2 };
    }
    if (data.y1.sD !== data.y1.eD) {
      return { range: data.y1.eD - data.y1.sD + 1 };
    }
    return { range: 1 };
  }

  
   * **summary**: validate that the unavailability to be updated is present in the database, and verify that the expected **range** (number of days) of the Unavailability to update
   * matches the actual range of the Unavailability as it's saved in the database. Use the results of the calculateRange() method, to compare the range of the Unavailability in
   * the database to the range of the request
   * @param value the raw request data
   * @param range the range of the requested update Unavailability data
   
  private validateExpectedUnavailability = async (
    value: ValidateUpdateUnavailabilityDto, range: { range: number },
  ) => {
    const test = await this.unavailability.find({
      rentalId: value.rentalId,
      unavailabilityId: value.unavailabilityId,
    });

    if (test.length < 1) {
      throw new Error('The requested unavailability is not in the database');
    }
    if (test.length !== range.range) {
      throw new Error('The expected # of days of unavailability to update,\
      does not match the actual number of days in the database; please remove the unavailability and add a new one instead');
    }

  }


   * **summary**: validate the incoming dto data does not break the below validation tree
   * @param value the sorted request to update already scheduled Unavailability on a Rental
 
  private validateDto = async (value: ValidateUpdateUnavailabilityDto) => {
    if (typeof value.unavailabilityId !== 'string') {
      throw new Error('invalid unavailabilityId; must be a string');
    }
    if (typeof value.rentalId !== 'string') {
      throw new Error('invalid rental ID; must be a string');
    }
    if (
      typeof value.newStart !== 'number' ||
      value.newStart < 0 ||
      value.newStart > 24
    ) {
      throw new Error('invalid start time; must be a number');
    }
    if (
      typeof value.newEnd !== 'number' ||
      value.newEnd < 0 ||
      value.newEnd > 24
    ) {
      throw new Error('invalid end time; must be a number');
    }
    if (value.newStart >= value.newEnd) {
      throw new Error(
        'start time cannot be the same as, or before, the end time',
      );
    }
    if (typeof value.y1.sD !== 'number') {
      throw new Error('invalid minimum DOY; must be a number');
    }
    if (typeof value.y1.eD !== 'number') {
      throw new Error('invalid maximum DOY; must be a number');
    }
    if (value.y1.sD > value.y1.eD) {
      throw new Error('minimum DOY cannot be larger than maximum DOY');
    }
    if (typeof value.y2.sD !== 'number') {
      throw new Error('invalid minimum DOY; must be a number');
    }
    if (typeof value.y2.eD !== 'number') {
      throw new Error('invalid maximum DOY; must be a number');
    }
    if (value.y2.sD > value.y2.eD) {
      throw new Error('minimum DOY cannot be larger than maximum DOY');
    }
    if (typeof value.newTitle !== 'string' && value.newTitle !== null) {
      throw new Error('invalid title; must be a string');
    }
    if (
      typeof value.newStart !== 'number' ||
      value.newStart < 0 ||
      value.newStart > 24
    ) {
      throw new Error('invalid update start time; must be a number');
    }
    if (
      typeof value.newEnd !== 'number' ||
      value.newEnd < 0 ||
      value.newEnd > 24
    ) {
      throw new Error('invalid update end time; must be a number');
    }
    if (value.newStart >= value.newEnd) {
      throw new Error(
        'update start time cannot be the same as, or before, the update end time',
      );
    }
  }


   * **summary**: apply the validatedto(), calculateRange(), and validateExpectedUnavailability() methods to incoming requests to the
   * rental.controller.updateUnavailability() method. Validate the request before passing the data to the handler
   * @param req the request object
   * @param res the response object
   * @param next the next method to continue onto the next handler
   
  use = async (req: Request, res: Response, next: Function): Promise<void> => {
    // apply only to update-unavailability request
    if (req.originalUrl === '/v1/rental/update-unavailability') {
      await this.validateDto(req.body);
      const range = await this.calculateRange({
        y1: req.body.y1,
        y2: req.body.y2,
      }); // to validate expected # of Unavailability docs
      await this.validateExpectedUnavailability(req.body, range);
    }
    next();
  }
}*/
