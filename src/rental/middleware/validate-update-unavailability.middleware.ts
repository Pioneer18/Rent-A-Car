import { Injectable, Inject, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { unavailabilityModel } from 'src/common/Const';
import { Model } from 'mongoose';
import { Unavailability } from '../interface/unavailability.interface';
import { UpdateUnavailabilityDto } from '../dto/update-unavailability.dto';
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

  callDb = async () => {
    const test = await this.unavailability.find();
    Logger.log('middleware query db test results below: ');
    Logger.log(test);
    return test;
  }

  // validate dto data
  private validateDto = async (value: UpdateUnavailabilityDto) => {
    if ((typeof value.rentalId) !== 'string') {
        throw new Error('invalid rental ID; must be a string');
    }
    if ((typeof value.year) !== 'number') {
        throw new Error('invalid year; must be a number');
    }
    if ((typeof value.start) !== 'number' || value.start < 0 || value.start > 24) {
        throw new Error('invalid start time; must be a number');
    }
    if ((typeof value.end) !== 'number' || value.end < 0 || value.end > 24) {
        throw new Error('invalid end time; must be a number');
    }
    if (value.start >= value.end) {
        throw new Error('start time cannot be the same as, or before, the end time');
    }
    if ((typeof value.minDoy !== 'number')) {
        throw new Error('invalid minimum DOY; must be a number');
    }
    if ((typeof  value.maxDoy !== 'number')) {
        throw new Error('invalid maximum DOY; must be a number');
    }
    if (value.minDoy > value.maxDoy) {
        throw new Error('minimum DOY cannot be larger than maximum DOY');
    }
    if ((typeof value.title) !== 'string') {
        throw new Error('invalid title; must be a string');
    }
    if ((typeof value.updateStart) !== 'number' || value.updateStart < 0 || value.updateStart > 24) {
        throw new Error('invalid update start time; must be a number');
    }
    if ((typeof value.updateEnd) !== 'number' || value.updateEnd < 0 || value.updateEnd > 24) {
        throw new Error('invalid update end time; must be a number');
    }
    if (value.updateStart >= value.updateEnd) {
        throw new Error('update start time cannot be the same as, or before, the update end time');
    }
  }
  // create query from dto

  async use(req: Request, res: Response, next: Function) {
    //
    Logger.log('Hello World!!!!!!!!!?');
    Logger.log(req.body);
    await this.validateDto(req.body);

    // await this.callDb();
    next();
  }
}
