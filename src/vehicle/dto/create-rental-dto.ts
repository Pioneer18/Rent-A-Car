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
  };
  registration: {
    vin: number;
    licensePlate: string;
    state: string;
  };
  features: {
    numOfSeats: number;
    numDoors: number;
    driveAssist: boolean;
    rearviewCam: boolean;
    bluetooth: boolean;
    sunRoof: boolean;
  };
  schedule: {
    requiredNotice: number;
    rentMinDuration: number;
    rentMaxDuration: number;
  };
  location: {
    street: string;
    city: string;
    zip: number;
  };
  photos: [];
  listed: boolean;
}
