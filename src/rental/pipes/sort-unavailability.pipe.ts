import { Injectable, PipeTransform } from '@nestjs/common';
import { Unavailability } from '../interface/unavailability.interface';
import { ScheduleUnavailabilityDto } from '../dto/scheduled-unavailability.dto';
import { Sorted } from '../interface/sorted.interface';
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

  // return one or two arrays of DOY sorted Unavailability
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

  async transform(value: ScheduleUnavailabilityDto) {
    const sorted: Sorted = await this.sort(value);
    return sorted;
  }
}
