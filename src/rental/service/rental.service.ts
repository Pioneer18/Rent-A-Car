import { Injectable, Inject } from '@nestjs/common';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { PricingDto } from '../dto/pricing.dto';
import { EditDetailsDto } from '../dto/edit-details.dto';
import { Processed } from '../interface/processed.interface';
import { unavailabilityModel } from 'src/common/Const';
import { Unavailability } from '../interface/unavailability.interface';

@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
    @Inject(unavailabilityModel) private readonly unavailability: Model<Unavailability>,
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

  private createQuery = async year => {
    return {
      rentalId: year.min.rentalId,
      year: year.year,
      doy: { $lte: year.max.doy, $gte: year.min.doy },
      start: { $gte: year.start, $lte: year.end },
      end: { $lte: year.end, $gte: year.start },
    };
  }

  private checkForOverlap = async (data: Processed) => {
    const { y1, y2 } = data;
    // if there are 2 years
    if (y2 !== null) {
      const y1Query = await this.createQuery(y1);
      const y2Query = await this.createQuery(y2);
      // query for both years
      const test1 = await this.unavailability.find(y1Query);
      const test2 = await this.unavailability.find(y2Query);
      if (test1.length || test2.length) {
        throw new Error('this request overlaps with existing unavailability');
      }
    }
    // else
    const query = await this.createQuery(y1);
    const test = await this.unavailability.find(query);
    if (test.length) {
      throw new Error('this request overlaps with existing unavailability');
    }
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
      const filter = { _id: data.rentalId };
      const update = {
        pricing: {
          price: data.price,
          discounts: {
            weekly: data.discounts.weekly,
            monthly: data.discounts.monthly,
          },
        },
      };
      const updater = {
        $set: update,
      };
      const doc = await this.rentalModel.findOneAndUpdate(filter, updater);
      return doc;
    } catch (err) { throw new Error(err); }
  }

  /**
   * Edit Rental Details:
   * edit the details of the Rental (# of seats, color, etc.)
   */
  async editDetails(data: EditDetailsDto) {
    // make an update document
    try {
      const filter = {_id: data.rentalId };
      const update = {
        specs: data.specs,
        features: data.features,
      };
      const updater = {
        $set: update,
      };
      const doc = await this.rentalModel.findOneAndUpdate(filter, updater);
      return doc;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Schedule Unavailability:
   * set a period of unavailability for the rental (e.g. mon - wed)
   */
  async scheduleUnavailability(processed: Processed) {
    this.checkForOverlap(processed);
    return 'tee-hee';
  }
}
