import { UnavailabilityDto } from '../dto/unavailability/unavailability.dto';

export interface ValidateUnavailabilityPipeInterface {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
}
