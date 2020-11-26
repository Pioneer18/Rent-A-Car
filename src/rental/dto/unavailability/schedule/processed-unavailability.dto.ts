import { UnavailabilityQueryDto } from './unavailability-query.dto';
import { ProcessedUnavailabilityQueryDto } from './processed-unavailability-query.dto';
/**
 * **summary**: the final procesed version of the request to schedule unavailability. It contains the UnavailabilityQueryDto data that was used
 * to create the ProcessedUnavailabilityQueryDtos as well as the returned ProcessedUnavailabilityQueryDto[]s that will be used by the handler
 * to schedule the new unavailability.
 * - passed to the rental.service.scheduleUnavailability() method
 */
export class ProcessedUnavailabilityDto {
    y1Query: UnavailabilityQueryDto;
    y2Query: UnavailabilityQueryDto | null;
    data: {
        y1: ProcessedUnavailabilityQueryDto[];
        y2: ProcessedUnavailabilityQueryDto[] | null;
    };
}
