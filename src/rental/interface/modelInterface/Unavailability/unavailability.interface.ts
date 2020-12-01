import * as mongoose from 'mongoose';
/**
 * **summary**: Interface for the 'Unavailability' Model
 */
export class UnavailabilityInterface extends mongoose.Document {
    rentalId: string;
    year: number;
    doy: number; // day of the year
    start: number; // min: 0; max: 24 military time
    end: number; // min: 0; max: 24 military time
    title: string; // e.g. Christmas Break
}
