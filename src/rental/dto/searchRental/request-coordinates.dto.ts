/**
 * Final Search Rental DTO
 */
export class RequestCoordinatesDto {
  address: string;
  price: number;
  features: string[];
  rentalDuration: number; // enum
  givenNotice: number;
}
