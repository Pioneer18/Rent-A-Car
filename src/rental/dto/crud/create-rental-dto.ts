import { Injectable } from '@nestjs/common';

/**
 * Create Rental DTO:
 * - The initial values submitted by a user to create a new rental listing
 */
@Injectable()
export class CreateRentalDto {
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
  location: {
    street: string;
    city: string;
    zip: number;
  };
  photos: string[];
  listed: boolean;
}
