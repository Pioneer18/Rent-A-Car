import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * **summary**: The schema for the Unavailability Model
 */
export const UnavailabilitySchema = new Schema({
    rentalId: String,
    startDate: Date, // Unix time stamp?
    endDate: Date, // Unix time stamp?
    startTime: {type: Number, min: 0, max: 24}, // min: 0; max: 24 military time
    endTime: {type: Number, min: 0, max: 24}, // min: 0; max: 24 military time
    title: String, // e.g. Christmas Break
});
