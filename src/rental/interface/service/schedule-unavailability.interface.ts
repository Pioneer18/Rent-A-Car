import { ProcessedUnavailabilityQueryDto } from '../../dto/unavailability/schedule/processed-unavailability-query.dto';
import { UnavailabilityQueryDto } from '../../dto/unavailability/schedule/unavailability-query.dto';
/**
 * **summary**: Interface for the rental.service.scheduleUnavailability() method
 */
export interface ScheduleUnavailabilityInterface {
    y1Query: UnavailabilityQueryDto;
    y2Query: UnavailabilityQueryDto | null;
    data: {
        y1: ProcessedUnavailabilityQueryDto[];
        y2: ProcessedUnavailabilityQueryDto[] | null;
    };
}
