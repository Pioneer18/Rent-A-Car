/**
 * Initial Raw Search Rental DTO
 */
export class PostGivenNoticeDto {
  address: string;
  rentalStartTime: Date;
  rentalEndTime: Date;
  features: [string];
  givenNotice: number;
}
