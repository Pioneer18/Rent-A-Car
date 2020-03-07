import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectId;

export const RentalSchema = new Schema({
  rentalId: ObjectID,
  rentalTitle: String,
  rentalDescription: String,
  address: String,
  loc: {
    type: { type: String },
    coordinates: Object,
  },
  specs: {
    odometer: Number,
    transmission: String,
    cityMpg: Number,
    hwyMpg: Number,
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
  features: [String],
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
  photos: [String],
  listed: Boolean,
});
