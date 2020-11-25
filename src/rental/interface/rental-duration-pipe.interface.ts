import { DateTime } from 'luxon';
/**
 * summary: returned by the GivenNoticePipe after processing a RawSearchRentalDto
 * - a givenNotice value is added to the dto
 */
export interface RentalDurationPipeInterface {
  address: string;
  rentalStartTime: DateTime;
  rentalEndTime: DateTime;
  price: number;
  features: string[];
  givenNotice: number;
}
