import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectID;

/**
 * Define the CustomPrices Schema
 */
export const CustomPricesSchema = new Schema(
    {
    rentalId: {type: String, required: true }, // reference to the vehicle
    year: {type: Number, required: true }, // e.g. 2020
    DOY: {type: Number, required: true },
    interval: {
        start: {type: Number, min: 0, max: 24},
        end: {type: Number, min: 0, max: 24},
     },
    title: String, // e.g. Christmas
    },
);