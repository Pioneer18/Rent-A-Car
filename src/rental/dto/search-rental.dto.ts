/**
 * Search Rental DTO
 */
export class SearchRentalDto {
  address: string;
  loc: {
    type: string;
    coordinates: [number, number];
  };
  givenNotice: number;
  rentalInterval: number;
  features: [string];
}
