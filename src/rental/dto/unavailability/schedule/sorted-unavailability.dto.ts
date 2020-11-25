import { UnavailabilityDto } from '../unavailability.dto';

export interface SortedUnavailabilityDto {
    yA: UnavailabilityDto[];
    yB: UnavailabilityDto[] | null;
}
