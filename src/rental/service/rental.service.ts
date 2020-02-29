import { Injectable } from '@nestjs/common';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { PricingDto } from '../dto/pricing.dto';
import { EditDetailsDto } from '../dto/edit-details.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
  ) { }

  private async createRentalQuery(rental) {
    const query: any = {
      'scheduling.rentMinDuration': { $lte: rental.rentalDuration },
      'scheduling.rentMaxDuration': { $gte: rental.rentalDuration },
      'scheduling.requiredNotice': { $lte: rental.givenNotice },
      'loc': {
        $near: {
          $maxDistance: 12875, // 8 miles
          $geometry: {
            type: rental.loc.type,
            coordinates: [
              rental.loc.coordinates[0], // latitude
              rental.loc.coordinates[1], // longitude
            ],
          },
        },
      },
    };
    rental.price
      ? (query.pricing = {
        price: rental.price, // add price as optional search parameter
      })
      : (rental.priceRange = null);
    rental.features
      ? (query.features = { $in: rental.features })
      : (rental.features = null);
    return query;
  }

  /**
   * Create Rental:
   * create a new vehicle rental listing
   */
  async createRental(rental: MappedRentalInterface) {
    const document = await new this.rentalModel(rental);
    await document.save();
    return document;
  }

  /**
   * Search Rental:
   * find rentals available near a specified locations (user's location)
   */
  async searchRental(rental: SearchRentalDto) {
    const query = await this.createRentalQuery(rental);
    const rentals = await this.rentalModel.find(query);
    if (rentals.length > 0) {
      return rentals;
    } else {
      throw new Error('No rentals were found');
    }
  }

  /**
   * Edit Pricing:
   * edit the rental price
   */
  async editPricing(data: PricingDto) {
    // make an update document
    const filter = { _id: data.rentalId };
    const update = {
      specs: {
        pricing: {
          price: data.price,
          discounts: {
            weekly: data.discounts.weekly,
            monthly: data.discounts.monthly,
          },
        },
      },
    };
    const updater = {
      $set: update,
    };
    const doc = await this.rentalModel.findOneAndUpdate(filter, updater);
    return doc;
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  async editDetails(update: EditDetailsDto) {
    // create an updater from incoming data
  }

  /**
   * Schedule Unavailability:
   * set a period of unavailability for the rental (e.g. mon - wed)
   */
  async scheduleUnavailability(schedule: any /*scheduleUnavailabilityDto*/) {
    //
  }
}
