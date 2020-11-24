import {
  Injectable,
  PipeTransform,
  Logger,
  ArgumentMetadata,
} from '@nestjs/common';
import { PostGivenNoticeDto } from '../dto/retnalDuration/post-given-notice.dto';
import { RawSearchRentalDto } from '../dto/crud/raw-search-rental.dto';
import { DateTime } from 'luxon';
/**
 * Creates a Luxon Interval from the startTime and currentTime
 * Validates the Interval is at least 1 hour long
 * returns a PostGivenNoticeDto
 */
@Injectable()
export class GivenNoticePipe implements PipeTransform {

  private async createGivenNotice(startTime) {
    const givenNotice: number = startTime.diffNow().toObject().milliseconds;
    if (givenNotice >= 3600000) {
      return givenNotice;
    }
    throw new Error(
      'Sorry, you cannot request a rental less than an hour before it begins',
    );
  }

  private async validateRequestedTime(startTime, endTime) {
    if (startTime > endTime) {
      throw new Error(
        'The rental start time cannot be after the rental end time',
      );
    }
    if (endTime.diff(startTime).toObject().milliseconds < 3600000) {
      throw new Error('The rental must be at least 1 hour in Duration');
    }
  }

  async transform(value: RawSearchRentalDto) {
    try {
      // make start and end time into DateTimes
      const startTime: DateTime = DateTime.fromISO(
        new Date(value.rentalStartTime).toISOString(),
      );
      const endTime: DateTime = DateTime.fromISO(
        new Date(value.rentalEndTime).toISOString(),
      );
      await this.validateRequestedTime(startTime, endTime);
      const givenNotice = await this.createGivenNotice(startTime);
      const dto: PostGivenNoticeDto = {
        address: value.address,
        rentalStartTime: startTime,
        rentalEndTime: endTime,
        price: value.price ? value.price : null,
        features: value.features ? value.features : null,
        givenNotice,
      };
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
