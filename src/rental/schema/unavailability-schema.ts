import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * **summary**: The schema for the Unavailability Model
 */
export const UnavailabilitySchema = new Schema({
    unavailabilityId: String,
    rentalId: String,
    year: Number,
    doy: Number, // day of the year
    start: {type: Number, min: 0, max: 24}, // min: 0; max: 24 military time
    end: {type: Number, min: 0, max: 24}, // min: 0; max: 24 military time
    title: String, // e.g. Christmas Break
});
