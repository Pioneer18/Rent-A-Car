import { DateTime } from 'luxon';
import { SearchRentalRadius } from '../../../rental/const';
/**
 * **summary**: Dto returned by the RentalSearchFilterPipe after processing a RawSearchRentalDto; The RentalSearchFilterPipe adds the 'givenNotice' property
 * - passed to the RentalDurationPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RentalSearchFilter {
  address: string;
  rentalStartTime?: DateTime;
  rentalEndTime?: DateTime;
  price?: number;
  features?: string[];
  givenNotice?: number;
  radius: SearchRentalRadius;
}
