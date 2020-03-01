import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
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

  /**
   * @param u1 the 1st unavailability
   * apply DateTime.fromObject() to create a new DateTime
   */
  private convertToDateTime = async (u1: Unavailability): Promise<DateTime> => {
    if (!u1) {
      throw new Error('There is no requested unavailability');
    }
    const start: DateTime = DateTime.fromObject({
      year: u1.year,
      ordinal: u1.doy,
      hour: u1.start,
    });
    Logger.log(`the requested start DateTime below:`);
    Logger.log(start);
    return start;
  }

  /**
   * @param a = request start DateTime
   * @param b = current DateTime
   * requested unavailability cannot be before current date & time
   */
  private validateMinNotice = async (a: DateTime, b: DateTime) => {
    const notice: Interval = Interval.fromDateTimes(a, b).count('hours');
    if (isNaN(notice) || notice < 0) {
      throw new Error('requested unavailability cannot be in the past');
    }
    Logger.log(`notice below`);
    Logger.log(notice);
  }

  /**
   * @param value the ordered unavailability from previous pipe
   * validate current DateTime is >= requested Unavailability start DateTime
   */
  private validateRelevance = async (value: Ordered) => {
    // should already know y1 and y2
    const currentDateTime = DateTime.local();
    Logger.log(`the current DateTime below:`);
    Logger.log(currentDateTime);
    const start: DateTime = await this.convertToDateTime(value.y1[0]);
    // compare cdt and start dt
    await this.validateMinNotice(currentDateTime, start);
  }

  async transform(value: Ordered) {
    try {
      // validate each given year
      await this.validateRelevance(value);
      Logger.log('it is valid!!!!!!');
    } catch (err) {
      throw new Error(err);
    }
  }
}
