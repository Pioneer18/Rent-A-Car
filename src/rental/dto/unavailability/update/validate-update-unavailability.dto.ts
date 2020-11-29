/**
 * **summary**: this dto is used to query and validate that the Rental actually has the scheduled Unavailability
 * that the user is requesting to update.
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ValidateUpdateUnavailabilityDto {
  unavailabilityId: string;
  rentalId: string;
  y1: {
    sD: number;
    eD: number;
  };
  y2: {
    sD: number;
    eD: number;
  };
  newStart: number;
  newEnd: number;
  newTitle: string | null; // not required
}
