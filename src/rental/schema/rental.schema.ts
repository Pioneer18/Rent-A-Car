import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * **summary**: The schema for the Rental Model
 */
export const RentalSchema = new Schema({
  userId: String,
  rentalTitle: String,
  rentalDescription: String,
  address: String,
  loc: {
    type: { type: String },
    coordinates: [Number, Number],
  },
  specs: {
    odometer: Number,
    transmission: String,
    cityMpg: Number || null,
    hwyMpg: Number || null,
    mpgE: Number || null,
    fuel: String,
    gasGrade: String,
    description: String,
    make: String,
    model: String,
    style: String,
    color: String,
    numOfSeats: Number,
    numDoors: Number,
  },
  registration: {
    vin: String,
    licensePlate: String,
    state: String,
  },
  features: [{type: String}],
  scheduling: {
    requiredNotice: Number,
    rentMinDuration: Number,
    rentMaxDuration: Number,
  },
  pricing: {
    price: { type: Number /*, default: DEFAULT_PRICE*/ },
    discounts: {
      weekly: { type: Number, default: null },
      monthly: { type: Number, default: null },
    },
  },
  photos: [{type: String}],
  listed: Boolean,
});
