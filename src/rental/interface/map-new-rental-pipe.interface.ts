import { RawCreateRentalDto } from '../dto/crud/raw-create-rental-dto';

/**
 * summary:
 */
export interface MapNewRentalPipeInterface {
  value: RawCreateRentalDto;
  coords: [number, number];
  address: string;
}
