import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from '../dto/create-rental-dto';

@Injectable()
export class RentalService {
  constructor() {
    //
  }

  /**
   * Create Rental:
   * create a new vehicle rental listing
   */
  async createRental(rental: CreateRentalDto) {
    //
  }

  /**
   * Search Rental:
   * find rentals available near a specified locations (user's location)
   */
  async searchRental(rental: any /*SearchRentalDto*/) {
    //
  }

  /**
   * Edit Pricing:
   * edit the rental price
   */
  async editPricing(update: any /*EditPriceDto*/) {
    //
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  async editDetails(update: any /*EditDetailsDto */) {
    //
  }

  /**
   * Schedule Unavailability:
   * set a period of unavailability for the rental (e.g. mon - wed)
   */
  async scheduleUnavailability(schedule: any /*scheduleUnavailabilityDto*/) {
    //
  }
}
