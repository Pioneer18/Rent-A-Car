import { Injectable } from '@nestjs/common';

@Injectable()
export class EditDetailsDto {
  rentalId: string;
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
  features: string[];
}
