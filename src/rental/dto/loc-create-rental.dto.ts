import { RawCreateRentalDto } from './crud/raw-create-rental-dto';
/**
 * summary:
 */
export class LocCreateRentalDto {
  value: RawCreateRentalDto;
  coords: [number, number];
  address: string;
}
