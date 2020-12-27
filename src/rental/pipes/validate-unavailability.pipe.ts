/*import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
import { ValidateScheduleUnavailabilityDto } from '../dto/unavailability/schedule/validate-schedule-unavailability.dto';
import { UnavailabilityDto } from '../dto/unavailability/unavailability.dto';
import { ToItemsIndexes } from '../../common/util/to-item-indexes';
import { validated } from '../../common/Const';
import { ValidatedUnavailabilityDto } from '../dto/unavailability/validated-unavailability.dto';

@Injectable()
export class ValidateUnavailabilityPipe implements PipeTransform {
  constructor(private readonly toItemsIndexes: ToItemsIndexes) {}
  
   * **summary**: Confirm that the user is requesting to schedule a single block of Unavailable time for their Rental that is logically and will
   * not cause an error in the application
   * -validate requested rental start DateTime is not before the current DateTime
   * - if 2 years
   *   - validate each unavailability for y1 and y2 (private validateUnavailability)
   *   - check if y1 is a leap year, validate the number of days in the year (DOY) if it is a leap year
   *   - validate DOY crossover from y1 to y2; validate the extra DOY if it's a leap year
   * - else:
   *   - validate each unavailability in the single year
   * - return the validated year(s)
   

  
   * **summary**: Use the [**Luxon DateTime.fromObject()**]() method to create a new DateTime from the raw client requested startTime
   * @param u1 The 1st unavailabilityDto
   
  private convertToDateTime = async (u1: UnavailabilityDto): Promise<DateTime> => {
    if (!u1) {
      throw new Error('There is no requested unavailability');
    }
    const start: DateTime = DateTime.fromObject({
      year: u1.year,
      ordinal: u1.doy,
      hour: u1.start,
    });
    return start;
  }

  
   * **summary**: Validate that the requested unavailability is not before the current date & time
   * @param a = Request start DateTime
   * @param b = Current DateTime
   
  private validateMinNotice = async (a: DateTime, b: DateTime): Promise<void> => {
    const notice: Interval = Interval.fromDateTimes(a, b).count('hours');
    if (isNaN(notice) || notice < 0) {
      throw new Error('requested unavailability cannot be in the past');
    }
    Logger.log(`notice below`);
    Logger.log(notice);
  }

  
   * **summary**: Validate the requested unavailability start time is not in the past
   * @param value The ordered unavailability from previous pipe
   
  private validateRelevance = async (value: ValidateScheduleUnavailabilityDto): Promise<DateTime> => {
    // should already know y1 and y2
    const currentDateTime = DateTime.local();
    Logger.log(`the current DateTime below:`);
    Logger.log(currentDateTime);
    const start: DateTime = await this.convertToDateTime(value.y1[0]);
    // compare current DT and start DT
    await this.validateMinNotice(currentDateTime, start);
    return start;
  }

  
   * **summary**: This method is called when the requested Unavailability spans into the next year. this method verifies that the crossover into the next year
   * includes the extra day if it's a leapYear. Even if it's not a leap year, this method verifies there are no missing or extra days as the Unavailability enters the
   * start of the next year
   * @param y1
   * @param y2
   * @param ly
   
  private validateCrossover = async (
    y1: UnavailabilityDto[],
    y2: UnavailabilityDto[],
    ly: boolean,
  ): Promise<void> => {
    // y1's final Unavailability
    const y1Final = y1[y1.length - 1];
    // # of days in y1
    const diy = (await this.convertToDateTime(y1Final)).daysInYear;
    // final DOY of y1 must equal diy of y1
    if (diy !== y1Final.doy) {
      if (ly) {
        throw new Error(
          `the final day of this leap year, ${y1Final.doy}/${
            y1Final.year
          }, is missing`,
        );
      }
      throw new Error(
        `the final day of this year, ${y1Final.doy}/${y1Final.year}, is missing`,
      );
    }
    // validate y2 starts at 0, we already know it's sequential
    if (y2[0]) {
      if (y2[0].doy !== 0) {
        throw new Error('the 1st day of the second year is missing');
      }
    } else {
      throw new Error('there is not a second year');
    }
    Logger.log('the final unavailability of y1');
    Logger.log(y1Final);
    Logger.log(
      `the total days in y1: ${diy} & the final day of y1: ${y1Final.doy}`,
    );
    Logger.log(`this is a leap year: ${ly}`);
  }

  
   * **summary**: Use the [*Luxon DateTime.isInLeapYear()*](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#instance-get-isInLeapYear) method
   * to check if the this current year is a [**leap year**](https://www.timeanddate.com/date/leapyear.html). For example, this year 2020 is actually a leap year!
   * @param u1 The initial unavailability's DateTime
   
  private checkLeapYear = async (u1: DateTime): Promise<boolean> => {
    const check = u1.isInLeapYear;
    return check; // true or false
  }

  
   * **summary**: Validate the data inisde of each UnavailabilityDto that will be used to schedule a sequential single 'block of Unavailability' for the Rental
   * - note: Uses the toItemIndexes() util to map a new array of **tuples** conataining an UnavailabilityDto and it's index in the array
   * @param unavailability An array of UnavailabilityDtos, which is the data to create an individual Unavailability Document in the database
   
  private validateEachUnavailability = async (
    unavailability: UnavailabilityDto[],
  ): Promise<void> => {
    const base = unavailability[0];
    for (const { item, index } of this.toItemsIndexes.toItemIndexes(unavailability)) {
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
      if (item.start < 0 || item.start > 24 || item.end < 0 || item.end > 24) {
        throw new Error('the unavailable time must be in military time format');
      }
      // year congruence
      if (item.year !== base.year) {
        throw new Error(
          `invalid year: first year ${item.year} second year ${base.year}`,
        );
      }
      // sequential DOY
      if (index > 0) {
        if (unavailability[index].doy - 1 !== unavailability[index - 1].doy) {
          throw new Error('The requested unavailability is not sequential');
        }
      }
      // title congruence
      if (item.title !== base.title) {
        throw new Error(
          `request cannot have more than one title: 1st year title "${
            item.title
          }" 2nd year title "${base.title}"`,
        );
      }
    }
  }

  
   * **summary**: Validate congruence in rentalId, start, end, and title across y1 and y2
   * @param y1 The first year of the requested Unavailability
   * @param y2 The second year of the requested Unavailability
   
  private validateCrossYearCongruence = async (
    y1: UnavailabilityDto,
    y2: UnavailabilityDto,
  ): Promise<void> => {
    if (y1.rentalId !== y2.rentalId) {
      throw new Error('request cannot have more than 1 Rental ID');
    }
    if (y1.start !== y2.start || y1.end !== y2.end) {
      throw new Error(
        'each requested day of unavailability must share the same start end time',
      );
    }
    if (y1.title !== y2.title) {
      throw new Error(
        `request cannot have more than one title: 1st year title "${
          y1.title
        }" 2nd year title "${y2.title}"`,
      );
    }
  }

  
   * **summary**: Use the validateRelevance(), validateEachUnavailability(), validateCrossover(), validateCrossYearCongruence(),
   * validateMinNotice(), and checkLeapYear() methods to validate the client request and return a ValidatedUnavailabilityDto
   * @param value The sorted but unvalidated client request data
   
  transform = async (value: ValidateScheduleUnavailabilityDto): Promise<ValidatedUnavailabilityDto> => {
    try {
      const start: DateTime = await this.validateRelevance(value);
      // if 2 years; if there are 2 years we know y1 must include the final doy of y1
      if (value.y2 !== null) {
        // validate 2 years
        await this.validateEachUnavailability(value.y1);
        await this.validateEachUnavailability(value.y2);
        // check if y1 is a leap year
        const ly = await this.checkLeapYear(start);
        // validate crossover from y1 to y2; account for if it's a leap year
        await this.validateCrossover(value.y1, value.y2, ly);
        await this.validateCrossYearCongruence(value.y1[0], value.y2[0]);
        // return a ValidatedUnavailabilityDto
        return { y1: value.y1, y2: value.y2, validated };
      }
      await this.validateEachUnavailability(value.y1);
      return { y1: value.y1, y2: null, validated };
    } catch (err) {
      throw new Error(err);
    }
  }
}*/
