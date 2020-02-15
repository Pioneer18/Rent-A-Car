import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectId;

export const RentalSchema = new Schema({
  rentalId: ObjectID,
  rentalTitle: String,
  RentalDescription: String,
  address: String,
  loc: {
    type: String,
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
    model: String,
    style: String,
    color: String,
  },
  registration: {
    vin: Number,
    licensePlate: String,
    state: String,
  },
  features: {
    numOfSeats: Number,
    numDoors: Number,
    driveAssist: Boolean,
    rearviewCam: Boolean,
    bluetooth: Boolean,
    sunRoof: Boolean,
  },
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
  listed: Boolean,
});
