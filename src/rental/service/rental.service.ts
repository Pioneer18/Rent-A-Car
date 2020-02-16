import { Injectable } from '@nestjs/common';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
  ) {}

  /**
   * Create Rental:
   * create a new vehicle rental listing
   */
  async createRental(rental: MappedRentalInterface) {
    try {
      const document = await new this.rentalModel(rental);
      await document.save();
      return document;
    } catch (err) {
      throw new Error(err);
    }
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
