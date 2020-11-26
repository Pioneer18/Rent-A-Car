/**
 * summary: this is a modified version of the UnavailabilityDto that is ready to be used in the CreateQueryDto
 * - passed as a property of the CreateQueryDto
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