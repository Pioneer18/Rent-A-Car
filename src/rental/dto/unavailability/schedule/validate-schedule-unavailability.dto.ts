import { UnavailabilityDto } from '../unavailability.dto';
/**
 * summary: returned by the SortUnavailabilityPipe, this dto contains the raw request to schedule Unavailability
 * for a rental sorted into two year groupings; if the requested Unavailability spans across 2 years. This would usually occur
 * near the end of a year, such as from Decemeber 20, 2020 - January 5, 2021
 * - passed to the ValidateUnavailabilityPipe
 */
export class ValidateScheduleUnavailabilityDto {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
}
