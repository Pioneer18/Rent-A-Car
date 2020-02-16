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
    model: String,
    style: String,
    color: String,
    numOfSeats: Number,
    numDoors: Number,
    driveAssist: {type: Boolean, default: false},
    rearviewCam: {type: Boolean, default: false},
    bluetooth: {type: Boolean, default: false},
    sunRoof: {type: Boolean, default: false},
  },
  registration: {
    vin: Number,
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
