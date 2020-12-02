/**
 * **summary**: Interface for the Unavailability Model
 */
export interface UnavailabilityInterface {
    rentalId: string;
    year: number;
    doy: number; // day of the year
    start: number; // min: 0; max: 24 military time
    end: number; // min: 0; max: 24 military time
    title: string; // e.g. Chris
}
