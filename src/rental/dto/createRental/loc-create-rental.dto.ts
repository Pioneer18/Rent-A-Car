import { RawCreateRentalDto } from './raw-create-rental-dto';
/**
 * **summary**: This dto contains the initial data submitted by a user to create a new rental listing. It also
 * contains the raw location information as a single "address" string ad the coordinates for the address
 * - passed to the MapNewRentalPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class LocCreateRentalDto {
  value: RawCreateRentalDto;
  coords: [number, number];
  address: string;
}
