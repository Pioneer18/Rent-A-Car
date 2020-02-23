import { Injectable, PipeTransform } from '@nestjs/common';
import { PostGivenNoticeDto } from '../dto/post-given-notice.dto';
import { RawSearchRentalDto } from '../dto/raw-search-rental.dto';
import { Interval, DateTime } from 'luxon';

@Injectable()
export class GivenNoticePipe implements PipeTransform {
    async createGivenNotice(startTime) {
        const givenNotice: number = Interval.fromDateTimes(DateTime.local(), startTime).length('hours');
        return givenNotice;
    }
    async transform(value: RawSearchRentalDto) {
        try {
            const givenNotice = await this.createGivenNotice(value.rentalStartTime);
            if (givenNotice < 1) { throw new Error('given notice must be at least 1 hour'); }
            const dto: PostGivenNoticeDto = {
                address: value.address,
                rentalStartTime: value.rentalStartTime,
                rentalEndTime: value.rentalEndTime,
                features: value.features,
                givenNotice,
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}
