import { DateTime } from 'luxon';
/**
 * **summary**: returned by the GivenNoticePipe after processing a RawSearchRentalDto
 * - The GivenNoticePipe added the 'givenNotice' property
 * - passed to the RentalDurationPipe
 */
export class GivenNoticeSearchRentalDto {
  address: string;
  rentalStartTime: DateTime;
  rentalEndTime: DateTime;
  price: number;
  features: string[];
  givenNotice: number;
}
