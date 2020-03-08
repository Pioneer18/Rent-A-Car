import { Injectable, Inject, Logger } from '@nestjs/common';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { PricingDto } from '../dto/pricing.dto';
import { EditDetailsDto } from '../dto/edit-details.dto';
import { unavailabilityModel } from 'src/common/Const';
import { Unavailability } from '../interface/unavailability.interface';
import { ProcessedUnavailabilityDto } from '../dto/processed-unavailability.dto';
import { ValidateUpdateUnavailabilityDto } from '../dto/validate-update-unavailability.dto';
import { UpdateUnavailabilityDto } from '../dto/update-unavailability.dto';
import { UpdateUnavailabilityDataDto } from '../dto/update-unavailability-data.dto';

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

  /**
   * @param data query for 1 or 2 years
   * validate there currently is no Unavailability in the db that overlaps with the requested
   */
  private checkForOverlap = async (data: ProcessedUnavailabilityDto) => {
    const { y1Query, y2Query } = data;
    // if there are 2 years
    if (y2Query !== null) {
      const test1 = await this.unavailability.find(y1Query);
      const test2 = await this.unavailability.find(y2Query);
      Logger.log(`test1`);
      Logger.log(test1);
      Logger.log(`test2`);
      Logger.log(test2);
      if (test1.length || test2.length) {
        throw new Error('this request overlaps with existing unavailability');
      }
    }
    // else
    const test = await this.unavailability.find(y1Query);
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
  async scheduleUnavailability(processed: ProcessedUnavailabilityDto) {
    try {
      await this.checkForOverlap(processed);
      // if it passed, combine data into one array and insert
      const {y1, y2} = processed.data;
      if (y2 !== null) {
        const merged = y1.concat(y2);
        Logger.log(`the merged years`);
        Logger.log(merged);
        return await this.unavailability.insertMany(merged, {ordered: true});
      }
      return await this.unavailability.insertMany(y1, {ordered: true});
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Update Unavailability
   * edit the time interval of an unavailability series
   */
  async updateUnavailability(data: UpdateUnavailabilityDataDto) {
    // send the update
    const update = await this.unavailability.updateMany(data.filter, data.updater);
    return update;
  }
}
