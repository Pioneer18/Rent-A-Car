import { UnavailabilityDto } from '../dto/unavailability/unavailability.dto';

export interface Sorted {
    yA: UnavailabilityDto[];
    yB: UnavailabilityDto[] | null;
}
