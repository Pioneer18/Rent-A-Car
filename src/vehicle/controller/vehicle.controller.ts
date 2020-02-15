import { Controller } from '@nestjs/common';
import { VehicleService } from '../service/vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}
}
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
 * Edit Vehicle Details:
 * edit the details of the vehicle (# of seats, color, etc.)
 */

/**
 * Schedule Unavailability
 * set a period of unavailability for the rental (e.g. mon - wed  )
 */
