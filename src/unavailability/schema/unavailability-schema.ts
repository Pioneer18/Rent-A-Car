import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * **summary**: The schema for the Unavailability Model
 */
export const UnavailabilitySchema = new Schema({
    rentalId: String,
    title: String, // e.g. Christmas Break
    startDateTime: {
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        // timeZone: String,
    },
    endDateTime:{
        year: Number,
        month: Number,
        day: Number,
        hour: Number,
        minute: Number,
        // timeZone: String,
    }
});
