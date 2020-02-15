import { Injectable } from '@nestjs/common';

/**
 * Create Rental DTO
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
    price: number;
    discounts: {
      weekly: number,
      monthly: number,
    },
  };
  location: {
    street: string;
    city: string;
    zip: number;
  };
  photos: [File];
  listed: boolean;
}
