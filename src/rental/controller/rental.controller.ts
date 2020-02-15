import { Controller, Post, Body } from '@nestjs/common';
import { RentalService } from '../service/rental.service';

@Controller('Rental')
export class RentalController {
  constructor(private readonly RentalService: RentalService) {}

  /**
   * Create Rental:
   * create a new vehcile rental listing
   */

  /**
   * Search Rental:
   * find rentals available near a specified location (user's location)
   */

  /**
   * Edit Pricing:
   * edit the rental price
   */

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */

  /**
   * Schedule Unavailability
   * set a period of unavailability for the rental (e.g. mon - wed  )
   */
}
