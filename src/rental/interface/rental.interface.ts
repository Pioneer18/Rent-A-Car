/**
 * Rental Interface
 */
export interface RentalInterface {
  rentalTitle: string;
  rentalDescription: string;
  address: string;
  lock: {
    type: string;
    coordinates: string;
  };
  specs: {
    odometer: number;
    transmission: string;
    cityMpg: number;
    hwyMpg: number;
    fuel: string;
    gasGrade: string;
    description: string;
    model: string;
    style: string;
    color: string;
    numOfSeats: number;
    numDoors: number;
    driveAssist: boolean;
    rearviewCam: boolean;
    bluetooth: boolean;
    sunRoof: boolean;
  };
  registration: {
    vin: number;
    licensePlate: string;
    state: string;
  };
  features: [string];
  scheduling: {
    requiredNotice: number;
    rentMinDuration: number;
    rentMaxDuration: number;
  };
  pricing: {
    price: { type: number /*; default: DEFAULT_PRICE*/ };
    discounts: {
      weekly: { type: number; default: null };
      monthly: { type: number; default: null };
    };
  };
  photos: [string];
  listed: boolean;
}
