/**
 * **summary**: Interface for the rental.service.createRental() method
 */
export interface CreateRentalInterface {
  rentalTitle: string;
  rentalDescription: string;
  address: string;
  specs: {
    odometer: number;
    transmission: string;
    cityMpg: number | null;
    hwyMpg: number | null;
    mpgE: number | null;
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
  features: string[];
  scheduling: {
    requiredNotice: number;
    rentMinDuration: number;
    rentMaxDuration: number;
  };
  pricing: {
    price: number;
    discounts: {
      weekly: number;
      monthly: number;
    };
  };
  loc: {
    type: string;
    coordinates: [number, number];
  };
  photos: string[];
  listed: boolean;
}
