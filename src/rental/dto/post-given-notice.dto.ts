/**
 * Initial Raw Search Rental DTO
 */
export class PostGivenNoticeDto {
  address: string;
  rentalStartTime: Date;
  rentalEndTime: Date;
  price: number;
  features: [string];
  givenNotice: number;
}
