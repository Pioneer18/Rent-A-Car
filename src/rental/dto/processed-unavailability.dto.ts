import { UnavailabilityQuery } from '../interface/unavailability-query.interface';

export class ProcessedUnavailabilityDto {
    y1Query: UnavailabilityQuery;
    y2Query: UnavailabilityQuery | null;
}