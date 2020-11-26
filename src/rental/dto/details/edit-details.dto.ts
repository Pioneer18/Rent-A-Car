
/**
 * **summary**: edit the details of a rental
 * - passed to the rental.service.editDetails method
 */
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
    make: string;
    model: string;
    style: string;
    color: string;
    numOfSeats: number;
    numDoors: number;
  };
  features: string[];
}
