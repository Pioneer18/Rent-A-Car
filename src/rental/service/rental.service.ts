import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from '../dto/create-rental-dto';
import { geoUrlApi } from '../utils/geo-url-api';
import { GeoInterface } from '../interface/geo.interface';
import { mapNewRental } from '../utils/map-new-rental';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
  ) { }

  /**
   * Create Rental:
   * create a new vehicle rental listing
   */
  async createRental(rental: CreateRentalDto) {
    try {
      const geo: GeoInterface = await geoUrlApi(rental);
      const data: MappedRentalInterface = await mapNewRental(rental, geo);
      const document = new this.rentalModel(data);
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
