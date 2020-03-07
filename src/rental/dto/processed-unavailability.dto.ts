import { UnavailabilityQuery } from '../interface/unavailability-query.interface';
import { ValidatedUnavailabilityDto } from './validated-unavailability.dto';
import { ProcessedUnavailabilityInterface } from '../interface/processed-unavailability.interface';

export class ProcessedUnavailabilityDto {
    y1Query: UnavailabilityQuery;
    y2Query: UnavailabilityQuery | null;
    data: {
        y1: ProcessedUnavailabilityInterface[];
        y2: ProcessedUnavailabilityInterface[] | null;
    };
}
