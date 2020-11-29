/**
 * **summary**: This is a modified version of the UnavailabilityDto that is ready to be used in the CreateQueryDto, it's passed as a property of the CreateQueryDto
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ProcessedUnavailabilityQueryDto {
    unavailabilityId: string; // for updating and quick indexing
    rentalId: string;
    year: number;
    doy: number;
    start: number;
    end: number;
    title: string;
}