import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from '../dto/create-rental-dto';

@Injectable()
export class VehicleService {
  constructor() {
    //
  }

  /**
   * Create Rental:
   * creare a new vehicle rental listing
   */
  async createRental(rental: CreateRentalDto) {
    //
  }

  /**
   * Search Rental:
   * find rentals available near a specified locations (user's location)
   */

  /**
   * Edit Pricing:
   * edit the rental price
   */

  /**
   * Edit Vehicle Details:
   * edit the details of the vehicle (# of seats, color, etc.)
   */

  /**
   * Schedule Unavailability:
   * set a period of unavailability for the rental (e.g. mon - wed)
   */
}
