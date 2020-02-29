import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UnavailabilitySchema = new Schema({
    rentalId: String,
    year: Number,
    doy: Number, // day of the year
    start: Number, // min: 0; max: 24 military time
    end: Number, // min: 0; max: 24 military time
    title: String, // e.g. Christmas Break
});
