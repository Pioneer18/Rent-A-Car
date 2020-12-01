import { Injectable, Logger } from '@nestjs/common';
import { Interval } from 'luxon';
import { RentalDurations } from '../const';
import { ProcessRentalTimeDto } from '../dto/searchRental/process-rental-time.dto';
import { GenerateRentalDurationEnumInterface } from '../interface/utils/generateRentalDuration/generate-rental-duration-enum.interface';
/**
 * **summary**: generate RentalDuration Enums for the rentalDuration propery of the RequestCoordinatesDto
 */
@Injectable()
export class GenerateRentalDurationEnumUtil {
  /**
   * **summary**: using the [**Luxon Interval.fromDateTimes(https://moment.github.io/luxon/docs/class/src/interval.js~Interval.html#static-method-fromDateTimes)**] method return the 
   * duration of the rental in months, weeks, and days
   * @param startTime 
   * @param endTime 
   */
  private processRentalTime = async (data: GenerateRentalDurationEnumInterface): Promise<ProcessRentalTimeDto> => {
    try {
      const base = Interval.fromDateTimes(data.startTime, data.endTime);
      const months = base.length('months');
      const weeks = base.length('weeks');
      const days = base.length('days');
      Logger.log(`The Base`);
      Logger.log(base);
      Logger.log(`months: ${months}, weeks: ${weeks}, days: ${days}`);
      return { months, weeks, days };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: create a RentalDuration [**Enum**](https://www.typescriptlang.org/docs/handbook/enums.html) from the given start and end time 
   * @param startTime 
   * @param endTime 
   */
  generateRentalDurationEnum = async (data: GenerateRentalDurationEnumInterface): Promise<RentalDurations> => {
    try {
      const schedule: ProcessRentalTimeDto = await this.processRentalTime({ startTime: data.startTime, endTime: data.endTime });
      if (schedule.months > 3) {
        return RentalDurations.Any;
      }
      if (schedule.months <= 3 && schedule.months > 1) {
        return RentalDurations['3 Months'];
      }
      if (schedule.months <= 1 && schedule.weeks > 3) {
        return RentalDurations['1 Month'];
      }
      if (schedule.weeks <= 3 && schedule.weeks > 1) {
        return RentalDurations['3 Weeks'];
      }
      if (schedule.weeks <= 1 && schedule.days > 5) {
        return RentalDurations['1 Week'];
      }
      if (schedule.days <= 5 && schedule.days > 3) {
        return RentalDurations['5 Days'];
      }
      if (schedule.days <= 3 && schedule.days > 1) {
        return RentalDurations['3 Days'];
      }
      if (schedule.days === 1) {
        return RentalDurations['1 Day'];
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
