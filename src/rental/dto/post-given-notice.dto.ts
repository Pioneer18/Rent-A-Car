import { DateTime } from 'luxon';
/**
 * Initial Raw Search Rental DTO
 */
export class PostGivenNoticeDto {
  address: string;
  rentalStartTime: DateTime;
  rentalEndTime: DateTime;
  price: number;
  features: [string];
  givenNotice: number;
}
