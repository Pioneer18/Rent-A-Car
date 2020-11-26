/**
 * **summary**: interface for the 'Rental' Model
 */
export interface RentalInterface {
  rentalDescription: string;
  address: string;
  loc: {
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
    make: string;
    model: string;
    style: string;
    color: string;
    numOfSeats: number;
    numDoors: number;
  };
  registration: {
    vin: string;
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
