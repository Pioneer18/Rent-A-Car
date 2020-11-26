import { RawCreateRentalDto } from './raw-create-rental-dto';
/**
 * summary: contains the initial data submitted by a user to create a new rental listing. It also
 * contains the raw location information as a single "address" string ad the coordinates for the address
 * - passed to the MapNewRentalPipe
 */
export class LocCreateRentalDto {
  value: RawCreateRentalDto;
  coords: [number, number];
  address: string;
}
