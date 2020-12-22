import {
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RentalSearchFilter } from '../dto/searchRental/given-notice-search-rental-dto';
import { RawSearchRentalDto } from '../dto/searchRental/raw-search-rental.dto';
import { DateTime } from 'luxon';
/**
 * **summary**: Creates a [**Luxon**](https://moment.github.io/luxon/) [**Interval**](https://moment.github.io/luxon/docs/manual/tour.html#intervals) from the startTime and currentTime
 * and then uses Luxon methods to validate the Given Notice is at least 1 hour in duration; this is the minimum allowed for any user
 * - Luxon is "a powerful, modern, and friendly wrapper for Javacript dates and times"
 */
@Injectable()
export class RentalSearchFilterPipe implements PipeTransform {

  /**
   * **summary**: Create the **givenNotice** property value, it must be at least one hour
   * @param startTime the request start time of the rental
   */
  private createGivenNotice = async (startTime): Promise<number> => {
    const givenNotice: number = startTime.diffNow().toObject().milliseconds;
    if (givenNotice >= 3600000) {
      return givenNotice;
    }
    throw new Error(
      'Sorry, you cannot request a rental less than an hour before it begins',
    );
  }

  /**
   * **summary**: Validate that the rental start time is not before the requested rental end time. The frontend of course has validation for this on the form,
   * this is just another level of validation.
   * @param startTime the requested time for the Rental to begin
   * @param endTime the requested time for the Rental to end
   */
  private validateRequestedTime = async (startTime, endTime): Promise<void> => {
    if (startTime > endTime) {
      throw new Error(
        'The rental start time cannot be after the rental end time',
      );
    }
    if (endTime.diff(startTime).toObject().milliseconds < 3600000) {
      throw new Error('The rental must be at least 1 hour in Duration');
    }
  }

  /**
   * **summary**: Use the validateRequestedTime and createGivenNotice methods to return a RentalSearchFilter
   * @param value the raw client request data to search for rentals
   */
  transform = async (value: RawSearchRentalDto): Promise<RentalSearchFilter> => {
    try {
      // Schedule specific query
      if (value.rentalStartTime && value.rentalEndTime) {
        const startTime: DateTime = DateTime.fromISO(
          new Date(value.rentalStartTime).toISOString(),
        );
        const endTime: DateTime = DateTime.fromISO(
          new Date(value.rentalEndTime).toISOString(),
        );
        await this.validateRequestedTime(startTime, endTime);
        const givenNotice = await this.createGivenNotice(startTime);
        const dto: RentalSearchFilter = {
          address: value.address,
          rentalStartTime: startTime,
          rentalEndTime: endTime,
          price: value.price ? value.price : null,
          features: value.features ? value.features : null,
          givenNotice,
          radius: value.radius
        };
        return dto;
      }
      // No Schedule
      const dto: RentalSearchFilter = {
        address: value.address,
        price: value.price ? value.price : null,
        features: value.features ? value.features : null,
        radius: value.radius
      }
      return dto
    } catch (err) {
      throw new Error(err);
    }
  }
}
