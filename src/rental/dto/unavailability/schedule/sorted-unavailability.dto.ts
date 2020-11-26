import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: the raw unavailability request has now been sorted into two year groupings, if the requested unavailability
 * spans across two years; e.g. December 20 2020 - January 5 2021
 * - passed to the ValidateUnavailabilityPipe
 */
export interface SortedUnavailabilityDto {
    yA: UnavailabilityDto[];
    yB: UnavailabilityDto[] | null;
}
