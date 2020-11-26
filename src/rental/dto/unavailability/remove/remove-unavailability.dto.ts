/**
 * **summary**: the information necessary to delte an Unavailability document from the database
 * - passed to the rental.service.removeUnavailability() method
 */
export class RemoveUnavailabilityDto {
  rentalId: string;
  unavailabilityId: string;
}
