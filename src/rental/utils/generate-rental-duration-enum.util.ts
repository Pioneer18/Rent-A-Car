import { Injectable, Logger } from '@nestjs/common';
import { Interval } from 'luxon';
import { RentalDurations } from '../const';
import { ProcessRentalTimeDto } from '../dto/retnalDuration/process-rental-time.dto';

@Injectable()
export class GenerateRentalDurationEnumUtil {
  private async processRentalTime(startTime, endTime):Promise<ProcessRentalTimeDto> {
    try {
      const base = Interval.fromDateTimes(startTime, endTime);
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

  async generateRentalDurationEnum(startTime, endTime) {
    try {
      const schedule: ProcessRentalTimeDto = await this.processRentalTime(startTime, endTime);
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
