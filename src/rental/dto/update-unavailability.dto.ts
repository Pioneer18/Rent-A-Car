export class UpdateUnavailabilityDto {
  unavailabilityId: string;
  rentalId: string;
  newStart: number;
  newEnd: number;
  newTitle: string; // not required
}
