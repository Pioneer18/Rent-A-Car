import { DateTime } from 'luxon';
/**
 * **summary**: Dto returned by the GivenNoticePipe after processing a RawSearchRentalDto; The GivenNoticePipe adds the 'givenNotice' property
 * - passed to the RentalDurationPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class GivenNoticeSearchRentalDto {
  address: string;
  rentalStartTime: DateTime;
  rentalEndTime: DateTime;
  price: number;
  features: string[];
  givenNotice: number;
}
