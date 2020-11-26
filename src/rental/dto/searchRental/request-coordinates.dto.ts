/**
 * summary: this dto contains the results of the GivenNoticePipe; which added the givenNotice property to this data
 * - passed to the RequestCoordinatesPipe
 */
export class RequestCoordinatesDto {
  address: string;
  price: number;
  features: string[];
  rentalDuration: number; // enum
  givenNotice: number;
}
