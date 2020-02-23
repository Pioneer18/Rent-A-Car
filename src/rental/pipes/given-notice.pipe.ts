import { Injectable, PipeTransform } from '@nestjs/common';
import { PostGivenNoticeDto } from '../dto/post-given-notice.dto';
import { RawSearchRentalDto } from '../dto/raw-search-rental.dto';
import { DateTime, Duration, diffNow, diff } from 'luxon';
/**
 * Creates a Luxon Interval from the startTime and currentTime
 * Validates the Interval is at least 1 hour long
 * returns a PostGivenNoticeDto
 */
@Injectable()
export class GivenNoticePipe implements PipeTransform {

    private async createGivenNotice(startTime) {
        const duration: Duration = diffNow(startTime);
        if (duration >= 1) {
            const givenNotice = duration;
            return givenNotice;
        }
        throw new Error('Sorry, you cannot request a rental less than an hour before it begins');
    }

    private async validateRequestedTime(startTime, endTime) {
        if ( startTime > endTime) { throw new Error('The rental start time cannot be after the rental end time'); }
        if (diff(endTime, startTime) < 1) { throw new Error('The rental must be at least 1 hour in Duration'); }
    }

    async transform(value: RawSearchRentalDto) {
        try {
            // make start and end time into DateTimes
            const startTime: DateTime = DateTime.fromISO(new Date(value.rentalStartTime).toISOString());
            const endTime: DateTime = DateTime.fromISO(new Date(value.rentalEndTime).toISOString());
            await this.validateRequestedTime(startTime, endTime);
            const givenNotice = await this.createGivenNotice(startTime);
            const dto: PostGivenNoticeDto = {
                address: value.address,
                rentalStartTime: startTime,
                rentalEndTime: endTime,
                price: value.price,
                features: value.features,
                givenNotice,
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}
