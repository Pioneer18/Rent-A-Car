import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: The initial dto submitted from the client to request to schedule Unavailability for a rental
 * - passed to the SortUnavailabilityPipe
 */
export class RawScheduleUnavailabilityDto {
  unavailability: UnavailabilityDto[];
}
