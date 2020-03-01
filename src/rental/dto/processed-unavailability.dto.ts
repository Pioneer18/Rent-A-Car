import { UnavailabilityQuery } from '../interface/unavailability-query.interface';
import { ValidatedUnavailabilityDto } from '../interface/validated-unavailability';

export class ProcessedUnavailabilityDto {
    y1Query: UnavailabilityQuery;
    y2Query: UnavailabilityQuery | null;
    data: ValidatedUnavailabilityDto;
}
