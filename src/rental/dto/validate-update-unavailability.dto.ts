export class ValidateUpdateUnavailabilityDto {
  unavailabilityId: string;
  rentalId: string;
  // for validating the expected unavailability range is actually in the DB
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
