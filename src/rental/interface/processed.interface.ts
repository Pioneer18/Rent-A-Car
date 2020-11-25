import { UnavailabilityDto } from '../dto/unavailability/unavailability.dto';

export interface Processed {
    min: UnavailabilityDto;
    max: UnavailabilityDto;
    year: number;
    start: number;
    end: number;
}
