import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: This Dto is the unavailability request sorted into two year groupings, if the requested unavailability
 * spans across two years; e.g. December 20 2020 - January 5 2021. It's passed to the ValidateUnavailabilityPipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export interface SortedUnavailabilityDto {
    yA: UnavailabilityDto[];
    yB: UnavailabilityDto[] | null;
}
