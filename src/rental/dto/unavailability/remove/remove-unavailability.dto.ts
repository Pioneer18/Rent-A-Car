import { RemoveUnavailabilityInterface } from '../../../../rental/interface/service/remove-unavailability.interface';
/**
 * **summary**: This Dto contains the data necessary to delte an Unavailability document from the database, it's passed to the rental.controller.removeUnavailability() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RemoveUnavailabilityDto implements RemoveUnavailabilityInterface {
  rentalId: string;
  unavailabilityId: string;
}
