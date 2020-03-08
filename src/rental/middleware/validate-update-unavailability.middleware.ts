import { Injectable, Inject, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { unavailabilityModel } from 'src/common/Const';
import { Model } from 'mongoose';
import { Unavailability } from '../interface/unavailability.interface';
import { ValidateUpdateUnavailabilityDto } from '../dto/validate-update-unavailability.dto';
/**
 * Check for any overlap in the db
 * create a query, if anything returned, throw an error
 */
@Injectable()
export class ValidateUpdateUnavailabilityMiddleware implements NestMiddleware {
  constructor(
    @Inject(unavailabilityModel)
    private readonly unavailability: Model<Unavailability>,
  ) {}

  private calculateRange = async (
    y1: { sD: number; eD: number },
    y2: { sD: number; eD: number } | null,
  ) => {
    if (y2 !== null) {
      Logger.log('This is a 2 year range ****');
      // calculate range for 2 years
      let temp1: number;
      let temp2: number;
      y1.sD === y1.eD ? temp1 = 1 : temp1 = y1.eD - y1.sD + 1;
      y2.sD === y2.eD ? temp2 = 1 : temp2 = y2.eD - y2.sD + 1;
      return {range: temp1 + temp2};
    }
    if (y1.sD !== y1.eD) {
      return { range: y1.eD - y1.sD + 1 };
    }
    return { range: 1 };
  }

  // validate that the unavailability is present in the db
  private validateExpectedUnavailability = async (
    value: ValidateUpdateUnavailabilityDto,
  ) => {
    const range = await this.calculateRange(value.y1, value.y2);
    const test = await this.unavailability.find({
      rentalId: value.rentalId,
      unavailabilityId: value.unavailabilityId,
    });

    if (test.length < 1) {
      throw new Error('The requested unavailability is not in the database');
    }
    if (test.length !== range) {
      throw new Error('The expected # of days of unavailability to update,\
      does not match the actual number of days in the database; please remove the unavailability and add a new one instead');
    }

  }

  // validate dto data
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
    if (typeof value.newTitle !== 'string') {
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

  async use(req: Request, res: Response, next: Function) {
    // apply only to update-unavailability request
    if (req.originalUrl === '/v1/rental/update-unavailability') {
      await this.validateDto(req.body);
      await this.validateExpectedUnavailability(req.body);
    }
    next();
  }
}
