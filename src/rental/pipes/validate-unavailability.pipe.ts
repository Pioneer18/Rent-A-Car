import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
import { Ordered } from '../interface/ordered.interface';
import { Unavailability } from '../interface/unavailability.interface';
import { toItemIndexes } from 'src/common/util/to-item-indexes';

@Injectable()
export class ValidateUnavailabilityPipe implements PipeTransform {
  /**
   * validate requested rental start DateTime is not before the current DateTime - DONE
   * if 2 years
   * - validate each unavailability for y1 and y2 (private validateUnavailability)
   * - check if y1 is a leap year, validate num of DOY if it is a leap year
   * - validate DOY crossover from y1 to y2; validate the extra DOY if it's a leap year
   * else validate each unavailability in the single year
   * return the validated year(s)
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
   * validate the requested unavailability start time is not in the past
   */
  private validateRelevance = async (value: Ordered): Promise<DateTime> => {
    // should already know y1 and y2
    const currentDateTime = DateTime.local();
    Logger.log(`the current DateTime below:`);
    Logger.log(currentDateTime);
    const start: DateTime = await this.convertToDateTime(value.y1[0]);
    // compare cdt and start dt
    await this.validateMinNotice(currentDateTime, start);
    return start;
  }

  private validateCrossover = async (y1: Unavailability[], y2: Unavailability[], ly: boolean): Promise<void> => {
      // y1's final Unavailability
      const y1Final = y1[y1.length - 1];
      // # of days in y1
      const diy = (await this.convertToDateTime(y1Final)).daysInYear;
      // final DOY of y1 must equal diy of y1
      if (diy !== y1Final.doy) {
        if (ly) {
            throw new Error(`the final day of this leap year, ${y1Final.doy}/${y1Final.year}, is missing`);
        }
        throw new Error(`the final day of this year, ${y1Final.doy}/${y1Final.year}, is missing`);
      }
      // validate y2 starts at 0, we already know it's sequential
      if (y2[0].doy) {
          if (y2[0].doy !== 0) {
              throw new Error('the 1st day of the second year is missing');
          }
      } else {
          throw new Error('there is not a second year');
      }
  }

  /**
   * @param u1 the initial unavailability's DateTime
   * return if it's a leap year or not
   */
  private checkLeapYear = async (u1: DateTime) => {
      const check = u1.isInLeapYear;

      return check; // true or false
  }

  private validateEachUnavailability = async (unavailability: Unavailability[]) => {
    const base = unavailability[0];
    for (const { item, index } of toItemIndexes(unavailability)) {
      // rentalId congruence
      if (item.rentalId !== base.rentalId) {
        throw new Error('request cannot have more than 1 Rental ID');
      }
      // interval
      if (item.start >= item.end) {
        throw new Error('start time cannot be before end time');
      }
      // interval congruence
      if (item.start !== base.start || item.end !== base.end) {
        throw new Error(
          'each requested day of unavailability must share the same start end time',
        );
      }
      // MTime
      if (item.start < 0 || item.start > 24 || item.end < 0 || item.end > 24
      ) {
        throw new Error('the unavailable time must be in military time format');
      }
      // year congruence
      if (item.year !== base.year) {
        throw new Error('invalid years');
      }
      // sequential DOY
      if (index > 0) {
        if (unavailability[index].doy - 1 !== unavailability[index - 1].doy) {
          throw new Error('The requested unavailability is not sequential');
        }
      }
      // title congruence
      if (item.title !== base.title) {
        throw new Error('request cannot have more than one title');
      }
    }
  }

  async transform(value: Ordered) {
    try {
      // validate startTime is not in the past
      const start: DateTime = await this.validateRelevance(value);
      Logger.log('it is valid!!!!!!');
      // if 2 years; if there are 2 years we know y1 must include the final doy of y1
      if (value.y2 !== null) {
          // validate 2 years
          await this.validateEachUnavailability(value.y1);
          await this.validateEachUnavailability(value.y2);
          // check if y1 is a leap year
          const ly = await this.checkLeapYear(start);
          // validate crossover from y1 to y2; account for if it's a leap year
          await this.validateCrossover(value.y1, value.y2, ly);
          // return a ValidatedUnavailabilityDto
          return {y1: value.y1, y2: value.y2};

      }
      // else
      await this.validateEachUnavailability(value.y1);
      // validate a single year
    } catch (err) {
      throw new Error(err);
    }
  }
}
