/**
 * summary: this is a mapped version of the raw request to update a Rental's already scheduled Unavailability.
 * It serves a simplified reference to the original data that will be used by the handler
 * - passed to rental.service.updateUnavailability() method
 */
export class UpdateUnavailabilityDto {
  unavailabilityId: string;
  rentalId: string;
  newStart: number;
  newEnd: number;
  newTitle: string; // not required
}
