import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: This Dto is the unavailability request sorted into two year groupings, if the requested unavailability
 * spans across two years; e.g. December 20 2020 - January 5 2021
 * - passed to the ValidateUnavailabilityPipe
 * 
 */
export interface SortedUnavailabilityDto {
    yA: UnavailabilityDto[];
    yB: UnavailabilityDto[] | null;
}
