import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreateRentalDto } from '../dto/crud/create-rental.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalDto } from '../dto/crud/search-rental.dto';
import { PricingDto } from '../dto/crud/pricing.dto';
import { EditDetailsDto } from '../dto/crud/edit-details.dto';
import { unavailabilityModel } from '../../common/Const';
import { Unavailability } from '../interface/unavailability.interface';
import { ProcessedUnavailabilityDto } from '../dto/unavailability/processed-unavailability.dto';
import { UpdateUnavailabilityDataDto } from '../dto/unavailability/update-unavailability-data.dto';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove-unavailability.dto';

/**
 * Rental Service: written by Jonathan Sells 11/24/2020
 * Create rentals, edit their scheduling and details, and search for rentals within a specified radius; e.g. 8 miles
 */
@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalInterface>,
    @Inject(unavailabilityModel)
    private readonly unavailability: Model<Unavailability>,
  ) { }

  /**
   * summary: create a new rental listing with attached geolocation coordinates
   * so the rental may be found by a geospatial query
   * @param rental the new rental to be created
   */
  async createRental(rental: CreateRentalDto) {
    try {
      const document = await new this.rentalModel(rental);
      return await document.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: query rentals in the database with the data provided in the SearchRentalDto
   * @param rental SearchRentalDto
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
   * summary: edit the rental pricing
   * - price
   * - discounts:
   *   - weekly
   *   - monthly
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
      const doc = await this.rentalModel.findOneAndUpdate(filter, updater, { new: true });
      return doc;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: edit the details of the Rental (# of seats, color, etc.)
   * @param data the data comes as an EditDetailsDto
   */
  async editDetails(data: EditDetailsDto) {
    // make an update document
    try {
      const filter = { _id: data.rentalId };
      const update = {
        specs: data.specs,
        features: data.features,
      };
      const updater = {
        $set: update,
      };
      const doc = await this.rentalModel.findOneAndUpdate(filter, updater, { new: true });
      return doc;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: set a period of unavailability for the rental (e.g. mon - wed)
   */
  async scheduleUnavailability(processed: ProcessedUnavailabilityDto) {
    try {
      await this.checkForOverlap(processed);
      // if it passed, combine data into one array and insert
      const { y1, y2 } = processed.data;
      if (y2 !== null) {
        const merged = y1.concat(y2);
        Logger.log(`the merged years`);
        Logger.log(merged);
        return await this.unavailability.insertMany(merged, { ordered: true });
      }
      return await this.unavailability.insertMany(y1, { ordered: true });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: edit a block of scheduled unavailability by either extending or reducing the scheduled duration of time on the rental
   * @param data 
   */
  async updateUnavailability(data: UpdateUnavailabilityDataDto) {
    // send the update
    try {
      const update = await this.unavailability.updateMany(
        data.filter,
        data.updater,
      );
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: remove an amount of time from a scheduled duration of unavailability on the rental
   * @param data 
   */
  async removeUnavailability(data: RemoveUnavailabilityDto) {
    try {
      const remove = await this.unavailability.deleteMany({
        rentalId: data.rentalId,
        unavailabilityId: data.unavailabilityId,
      });
      if (remove.deletedCount === 0) {
        throw new Error('No Unavailability documents were found, no documents were deleted');
      }
      return remove;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: convert a searchRentalDto into a mongoose query for the searchRental method
   * - The query searchs a maxium 8 mile radius for rentals
   * - Filters: 
   *   - rental min duration
   *   - rental max duration
   *   - advance notice minimum; e.g. 1 hour
   *   - loc: GeoJSON object
   *   - rental price: optional
   *   - rental features: optional
   * @param rental searchRentalDto
   */
  private async createRentalQuery(rental: SearchRentalDto) {
    try {
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
        : (rental.price = null);
      rental.features
        ? (query.features = { $in: rental.features })
        : (rental.features = null);
      return query;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * summary: validate there currently is no scheduled unavailability for the rental in the database that overlaps 
   * with the requested unavailability 
   * @param data query for 1 or 2 years
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
  };
}
