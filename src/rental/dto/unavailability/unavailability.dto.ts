/**
 * summary: schedule a block of unavilable time for the rental on a given day and year
 * - a user may schedule up to a year in the future so the specific "year" and "day of the year" is required
 */
export class UnavailabilityDto {
    rentalId: string;
    year: number;
    doy: number; // day of the year
    start: number; // min: 0; max: 24 military time
    end: number; // min: 0; max: 24 military time
    title: string; // e.g. Christmas Break
}
