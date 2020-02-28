import { Injectable, Logger } from '@nestjs/common';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { PricingDto } from '../dto/pricing.dto';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
  ) {}

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
  async searchRental(rental: SearchRentalDto) {
    try {
      const query = await this.createRentalQuery(rental);
      Logger.log(query);
      const rentals = await this.rentalModel.find(query);
      if (rentals.length > 0) {
        return rentals;
      } else {
        throw new Error('No rentals were found');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Edit Pricing:
   * edit the rental price
   */
  async editPricing(data: PricingDto) {
    // make an update document
    try {
      const filter = { _id: data.rentalId};
      Logger.log(filter);
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
      Logger.log(`updater`);
      Logger.log(updater.$set);
      const doc = await this.rentalModel.findOneAndUpdate(filter, updater);
      return doc;
    } catch (err) {
      throw new Error(err);
    }
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
