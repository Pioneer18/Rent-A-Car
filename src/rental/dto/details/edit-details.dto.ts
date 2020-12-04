import { EditDetailsInterface } from '../../../rental/interface/service/edit-details.interface';

/**
 * **summary**: Dto to edit the details of a rental, passed to the rental.controller.editDetails method.
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class EditDetailsDto implements EditDetailsInterface {
  rentalId: string;
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
  features: string[];
}
