import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { UnavailabilityDto } from '../dto/unavailability/unavailability.dto';
import { RawScheduleUnavailabilityDto } from '../dto/unavailability/schedule/raw-schedule-unavailability.dto';
import { SortedUnavailabilityDto } from '../dto/unavailability/schedule/sorted-unavailability.dto';
import { ValidateScheduleUnavailabilityDto } from '../dto/unavailability/schedule/validate-schedule-unavailability.dto';
/**
 * **summary**: Sort the requested Rental Unavailability into a single or 2 year groupings (arrays). Sort each year's (array's) UnavailabilityDtos by ascending DOY (Day of the Year)
 */
@Injectable()
export class SortUnavailabilityPipe implements PipeTransform {
  
  /**
   * **summary**: Validate that the requested Unavailability does not cross more than a one year duration
   * @param yearB this value is exactly 1 year from the current date
   */
  private validate2Years = async (yearB: UnavailabilityDto[]): Promise<void> => {
    for (const x of yearB) {
      if (x.year !== yearB[0].year) {
        throw new Error('Cannot request 3 years of unavailability');
      }
    }
    return;
  }

  /**
   * **summary**: Validate that the request to schedule unavailability is sequential and not two separate blocks of time
   * @param a year 1
   * @param b year 2
   */
  private validateSequential = async (a, b): Promise<void> => {
    if (a + 1 !== b) {
      throw new Error('years must be sequential');
    }
  }

  /**
   * **summary**: Return the sorted (by DOY) years in order, or return a single year
   * @param sorted the incoming data to be sorted
   */
  private orderYears = async (sorted: SortedUnavailabilityDto): Promise<ValidateScheduleUnavailabilityDto> => {
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

  /**
   * **summary**: Separate years into y1 and y2 array and sort each by DOY
   * @param value the raw client request to schedule Unavailability on a Rental
   */
  private sort = async (value: RawScheduleUnavailabilityDto): Promise<SortedUnavailabilityDto> => {
    // grab the year property from the first element
    const iYear: number = value.unavailability[0].year;
    // filter for other year(s)
    const tYearB: UnavailabilityDto[] = value.unavailability.filter(
      val => val.year !== iYear,
    );
    // return 2 sorted years
    if (tYearB && tYearB.length) {
      await this.validate2Years(tYearB);
      const yearB = tYearB.sort((a, b) => a.doy - b.doy);
      const yearA: UnavailabilityDto[] = value.unavailability
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

  /**
   * **summary**: Use the sort(), orderYears(), validateSequential(), and validate2Years() methods to sort and return the data as a ValidateScheduleUnavailabilityDto
   * @param value the raw client request data
   */
  transform = async(value: RawScheduleUnavailabilityDto): Promise<ValidateScheduleUnavailabilityDto> => {
    try {
      const sorted: SortedUnavailabilityDto = await this.sort(value);
      const ordered = await this.orderYears(sorted);
      Logger.log(`the ordered data below:`);
      Logger.log(ordered);
      return ordered;
    } catch (err) {
      throw new Error(err);
    }
  }
}
