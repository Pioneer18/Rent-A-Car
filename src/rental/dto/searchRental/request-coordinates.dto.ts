import { SearchRentalRadius } from "../../../rental/const";

/**
 * **summary**: This dto contains the results of the RentalSearchFilterPipe; which added the givenNotice property to this data. It's passed to the RequestCoordinatesPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RequestCoordinatesDto {
  address: string;
  price?: number;
  features?: string[];
  rentalDuration?: number; // enum
  givenNotice?: number;
  radius: SearchRentalRadius;
}
