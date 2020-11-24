import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { Unavailability } from '../interface/unavailability.interface';
import { ScheduleUnavailabilityDto } from '../dto/unavailability/scheduled-unavailability.dto';
import { Sorted } from '../interface/sorted.interface';
import { Ordered } from '../interface/ordered.interface';
/**
 * Sort requested Unavailability into one or two arrays (yearA, yearB)
 * Sort each array's Unavailability by ascending DOY
 */
@Injectable()
export class SortUnavailabilityPipe implements PipeTransform {
  // validate there are no more than 2 years
  private validate2Years = async (yearB: Unavailability[]): Promise<void> => {
    for (const x of yearB) {
      if (x.year !== yearB[0].year) {
        throw new Error('Cannot request 3 years of unavailability');
      }
    }
    return;
  }

  // validate years are sequential
  private validateSequential = async (a, b): Promise<void> => {
    if (a + 1 !== b) {
      throw new Error('years must be sequential');
    }
  }

  // return the sorted (by DOY) years in order, or return a single year
  private orderYears = async (sorted: Sorted): Promise<Ordered> => {
    // return a single year
    if (sorted.yB === null) {
      return { y1: sorted.yA, y2: null };
    }
    // place 2 years in order & validate they are sequential
    if (sorted.yA[0].year < sorted.yB[0].year) {
      await this.validateSequential(sorted.yA[0].year, sorted.yB[0].year);
      return { y1: sorted.yA, y2: sorted.yB };
    }
    await this.validateSequential(sorted.yB[0].year, sorted.yA[0].year);
    return { y1: sorted.yB, y2: sorted.yA };
  }

  // separate years into y1 and y2 array and sort each by DOY
  private sort = async (value: ScheduleUnavailabilityDto): Promise<Sorted> => {
    // grab the year property from the first element
    const iYear: number = value.unavailability[0].year;
    // filter for other year(s)
    const tYearB: Unavailability[] = value.unavailability.filter(
      val => val.year !== iYear,
    );
    // return 2 sorted years
    if (tYearB && tYearB.length) {
      await this.validate2Years(tYearB);
      const yearB = tYearB.sort((a, b) => a.doy - b.doy);
      const yearA: Unavailability[] = value.unavailability
        .filter(val => val.year === iYear)
        .sort((a, b) => a.doy - b.doy);
      return { yA: yearA, yB: yearB };
    }
    // return a single sorted year
    return {
      yA: value.unavailability.sort((a, b) => a.doy - b.doy),
      yB: null,
    };
  }

  // transform incoming
  async transform(value: ScheduleUnavailabilityDto): Promise<Ordered> {
    try {
      const sorted: Sorted = await this.sort(value);
      const ordered = await this.orderYears(sorted);
      Logger.log(`the ordered data below:`);
      Logger.log(ordered);
      return ordered;
    } catch (err) {
      throw new Error(err);
    }
  }
}
