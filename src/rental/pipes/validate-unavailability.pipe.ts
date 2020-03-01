import { Injectable, PipeTransform } from '@nestjs/common';
import { Sorted } from '../interface/sorted.interface';
import { DateTime } from 'luxon';
import { Ordered } from '../interface/ordered.interface';
import { Unavailability } from '../interface/unavailability.interface';

@Injectable()
export class ValidateUnavailabilityPipe implements PipeTransform {
  /**
   * validate requested rental start DateTime is not before the current DateTime
   * if 2 years, validate they are sequential, then mark them y1 and y2
   * - check if y1 is a leap year, validate num of DOY if it is a leap year
   * - validate each unavailability for y1 and y2 (private validateUnavailability)
   * - validate DOY crossover from y1 to y2; validate the extra DOY if it's a leap year
   * // this is a valid sequential series of unavailability to be requested for insert
   * else validate each unavailability in the year
   */

  private convertToDateTime = async (y1: Unavailability) => {
    // create DateTime from y1.year, y1.doy, y1.start
    DateTime.fromObject({ year: y1.year, ordinal: y1.doy, hour: y1.start });
  }

  private validateRelevance = async (value: Ordered) => {
    // should already know y1 and y2
  }

  async transform(value: Sorted) {
    // validate each given year
  }
}
