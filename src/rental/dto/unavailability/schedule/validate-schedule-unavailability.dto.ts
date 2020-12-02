import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: returned by the SortUnavailabilityPipe, this dto contains the raw request to schedule Unavailability
 * for a rental sorted into two year groupings; if the requested Unavailability spans across 2 years. This would usually occur
 * near the end of a year, such as from Decemeber 20, 2020 - January 5, 2021. This dto is passed to the ValidateUnavailabilityPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ValidateScheduleUnavailabilityDto {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
}
