

/**
 * summary:
 * - The initial values submitted by a user to create a new rental listing
 * - specs: specifications about the vehicle
 * - registration: basic vehicle registration data
 * - features: e.g. 'bike rack', 'heated seats', 'auto-pilot', etc.
 * - scheduling: list the required advance notice, as well as min & max rental duration
 * - pricing: the rental rate as well as discount conditions; e.g. weekly rentals get $5 off
 * - location: the steet, city, and zip of the user
 * - photos: a max of 10 image references
 * - listed: hide or show the rental to the application community
 * - passed to the GeoUrlApiPipe transform method. This is the raw data before the GeoJSON object is added and the final
 * CreateRentalDto has not been created
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
