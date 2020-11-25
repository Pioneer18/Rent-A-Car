import { UnavailabilityQueryDto } from './unavailability-query.dto';
import { ProcessedUnavailabilityQueryDto } from './processed-unavailability-query.dto';
/**
 * summary:
 */
export class ProcessedUnavailabilityDto {
    y1Query: UnavailabilityQueryDto;
    y2Query: UnavailabilityQueryDto | null;
    data: {
        y1: ProcessedUnavailabilityQueryDto[];
        y2: ProcessedUnavailabilityQueryDto[] | null;
    };
}
