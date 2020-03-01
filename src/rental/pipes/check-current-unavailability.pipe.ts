import { Injectable, PipeTransform, Logger, Inject } from '@nestjs/common';
import { ScheduleUnavailabilityDto } from '../dto/scheduled-unavailability.dto';
import { Unavailability } from '../interface/unavailability.interface';
import { toItemIndexes } from '../../common/util/to-item-indexes';
import { Processed } from '../interface/processed.interface';
import { Sorted } from '../interface/sorted.interface';
import { Ordered } from '../interface/ordered.interface';
import { DateTime } from 'luxon';

/**
 * Query DB and check if any of the requested Unavailability already exists
 * If it does throw an Error
 * TODO: break this into a processing pipe(s)
 * check requested year is at least the current year
 * check for leap year: DateTime.isInLeapYear()
 */
@Injectable()
export class CheckUnavailabilityPipe implements PipeTransform {

  private validate2Years = async (yearB: Unavailability[]): Promise<void> => {
    for (const x of yearB) {
      if (x.year !== yearB[0].year) {
        throw new Error('Cannot request 3 years of unavailability');
      }
    }
    return;
  }

  private validateEachUnavailability = async (unavailability: Unavailability[]) => {
    const base = unavailability[0];
    // confirm rental start DateTime is at least 1 hour before the current date time
    for (const { item, index } of toItemIndexes(unavailability)) {
      // uniform rentalId
      if (item.rentalId !== base.rentalId) {
        throw new Error('request cannot have more than 1 Rental ID');
      }
      // start before end
      if (item.start >= item.end) {
        throw new Error('start time cannot be before end time');
      }
      // uniform interval
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
      // uniform year
      if (item.year !== base.year) {
        throw new Error('invalid years');
      }
      // sequential DOY
      if (index > 0) {
        if (unavailability[index].doy - 1 !== unavailability[index - 1].doy) {
          throw new Error('The requested unavailability is not sequential');
        }
      }
      // uniform title
      if (item.title !== base.title) {
        throw new Error('request cannot have more than one title');
      }
    }
  }

  private sequelizeYears = async (sorted: Sorted): Promise<Ordered> => {
    if (sorted.yA[0].year < sorted.yB[0].year) {
     if ((sorted.yA[0].year + 1) === sorted.yB[0].year) {
       return { y1: sorted.yA, y2: sorted.yB };
      }
    }
    if ((sorted.yB[0].year + 1) === sorted.yA[0].year) {
      return { y1: sorted.yB, y2: sorted.yA };
    }
    throw new Error('years must be sequential');
  }

  // find the min and max Unavailability
  private minMax = async (year: Unavailability[]) => {
    const doyRange: number[] = year.map(x => x.doy);
    const min: number = Math.min(...doyRange);
    const max: number = Math.max(...doyRange);
    const minIndex = year.findIndex(x => x.doy === min);
    const maxIndex = year.findIndex(x => x.doy === max);
    Logger.log(`min: ${min}, and max: ${max}`);
    return { min: year[minIndex], max: year[maxIndex] };
  }

  // return min, max, year, start, and end for y1 and y2
  private processYears = async (sorted: Sorted): Promise<Processed> => {
    // a single year
    if (sorted.yB === null) {
      await this.validateEachUnavailability(sorted.yA);
      const { min, max } = await this.minMax(sorted.yA);
      return {
        y1: {
          min,
          max,
          year: sorted.yA[0].year,
          start: sorted.yA[0].start,
          end: sorted.yA[0].end,
          data: sorted.yA,
        },
        y2: null,
      };
    }
    // two years
    const { y1, y2 } = await this.sequelizeYears(sorted);
    await this.validateEachUnavailability(y1);
    await this.validateEachUnavailability(y2);
    const temp1 = await this.minMax(y1);
    const temp2 = await this.minMax(y2);
    return {
      y1: {
        min: temp1.min,
        max: temp1.max,
        year: y1[0].year,
        start: y1[0].start,
        end: y1[0].end,
        data: y1,
      },
      y2: {
        min: temp2.min,
        max: temp2.max,
        year: y2[0].year,
        start: y2[0].start,
        end: y2[0].end,
        data: y2,
      },
    };
  }

  // return one or two arrays of DOY sorted Unavailability
  private sort = async (value: ScheduleUnavailabilityDto): Promise<Sorted> => {
    // grab the year property from the first element
    const iYear: number = value.unavailability[0].year;
    // filter for other year(s)
    const tYearB: Unavailability[] = value.unavailability.filter(
      val => val.year !== iYear,
    );
    // return both years
    if (tYearB && tYearB.length) {
      await this.validate2Years(tYearB);
      // sort yearB by DOY
      const yearB = tYearB.sort((a, b) => a.doy - b.doy);
      // filter for initially grabbed year and sort by DOY
      const yearA: Unavailability[] = value.unavailability
        .filter(val => val.year === iYear)
        .sort((a, b) => a.doy - b.doy);
      return { yA: yearA, yB: yearB };
    }
    return {
      yA: value.unavailability.sort((a, b) => a.doy - b.doy),
      yB: null,
    };
  }

  async transform(value: ScheduleUnavailabilityDto) {
    try {
      // sort if there are 2 years
      const sorted: Sorted = await this.sort(value);
      // return min and max for each provided year; or null for y2
      const processed: Processed = await this.processYears(sorted);
      // return the processed request
      Logger.log(processed);
      return processed;
    } catch (err) {
      throw new Error(err);
    }
  }
}
