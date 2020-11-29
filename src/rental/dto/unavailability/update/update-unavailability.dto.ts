/**
 * **summary**: This dto is a simplified version of the initial request to update a Rental's already scheduled Unavailability.
 * It serves a simplified reference to the original data that will be used by the handler. It's passed to rental.service.updateUnavailability() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class UpdateUnavailabilityDto {
  unavailabilityId: string;
  rentalId: string;
  newStart: number;
  newEnd: number;
  newTitle: string; // not required
}
