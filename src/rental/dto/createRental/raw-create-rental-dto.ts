/**
 * **summary**: The initial dto submitted by a user to create a new rental listing.This dto is passed to the GeoUrlApiPipe transform method which will add coordinates from the location property information
 * - specs: specifications about the vehicle
 * - registration: basic vehicle registration data
 * - features: e.g. 'bike rack', 'heated seats', 'auto-pilot', etc.
 * - scheduling: list the required advance notice, as well as min & max rental duration
 * - pricing: the rental rate as well as discount conditions; e.g. weekly rentals get $5 off
 * - location: the steet, city, and zip of the user
 * - photos: a max of 10 image references
 * - listed: hide or show the rental to the application community
 * CreateRentalDto has not been created
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RawCreateRentalDto {
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
  location: {
    street: string;
    city: string;
    zip: number;
  };
  photos: string[];
  listed: boolean;
}
