/**
 * Final Search Rental DTO
 */
export interface RequestCoordinatesPipeInterface {
  address: string;
  price: number;
  features: string[];
  rentalDuration: number; // enum
  givenNotice: number;
}
