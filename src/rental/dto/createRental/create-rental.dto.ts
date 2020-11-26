/**
 * summary: the final format for a new rental to be created
 * - passed to the rental.service.createRental method
 */
export class CreateRentalDto {
  rentalDescription: string;
  address: string;
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