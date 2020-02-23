import { Injectable, Logger } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
import { RentalDurations } from '../const';

@Injectable()
export class GenerateRentalDurationEnumUtil {

    async generateRentalDurationEnum(startTime, endTime) {
        try {
            const base = Interval.fromDateTimes(startTime, endTime);
            const months = base.length('months');
            const weeks = base.length('weeks');
            const days = base.length('days');
            Logger.log(`The Base`);
            Logger.log(base);
            Logger.log( `months: ${months}, weeks: ${weeks}, days: ${days}`);
            if (months > 3) {
                return RentalDurations.Any;
            }
            if (months <= 3 && months > 1) {
                return RentalDurations['3 Months'];
            }
            if (months <= 1 && weeks > 3) {
                return RentalDurations['1 Month'];
            }
            if (weeks <= 3 && weeks > 1) {
                return RentalDurations['3 Weeks'];
            }
            if (weeks <= 1 && days > 5) {
                return RentalDurations['1 Week'];
            }
            if (days <= 5 && days > 3) {
                return RentalDurations['5 Days'];
            }
            if (days <= 3 && days > 1) {
                return RentalDurations['3 Days'];
            }
            if (days === 1) {
                return RentalDurations['1 Day'];
            }
        } catch (err) {
            throw new Error(err);
        }
    }

}
