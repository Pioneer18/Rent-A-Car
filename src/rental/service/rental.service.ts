import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalModelInterface } from '../interface/modelInterface/Rental/rental-model.interface';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalInterface } from '../interface/service/search-rental.interface';
import { unavailabilityModel } from '../../common/Const';
import { UnavailabilityModelInterface } from '../interface/modelInterface/Unavailability/unavailability.interface';
import { CreateRentalInterface } from '../interface/service/create-rental.interface';
import { EditPricingInterface } from '../interface/service/edit-pricing.interface';
import { RentalQuery } from '../interface/service/create-rental-query.interface';
import { EditPricingUpdater } from '../interface/service/edit-pricing-updater.interface';
import { EditDetailsInterface } from '../interface/service/edit-details.interface';
import { EditDetailsUpdater } from '../interface/service/edit-details-updater.interface';
import { ScheduleUnavailabilityInterface } from '../interface/service/schedule-unavailability.interface';
import { UpdateUnavailabilityDataInterface } from '../interface/service/update-unavailability-data.interface';
import { RemoveUnavailabilityInterface } from '../interface/service/remove-unavailability.interface';
import { UpdateResponseInterface } from '../../common/interfaces/update-response.interface';
import { DeleteResponseInterface } from 'src/common/interfaces/delete-response.interface';
import { UnavailabilityInterface } from '../interface/unavailability.interface';

/**
 * **summary**: Create, search for near (within a radius: e.g. 10 miles of) a location, update details, and schedule blocks of unavailable time for Rentals
 */
@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalModelInterface>,
    @InjectModel(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
  ) { }

  /**
   * **summary**: Create a new rental listing with attached geolocation coordinates
   * so the rental may be found by a geospatial query
   * @param rental The new rental to be created
   */
  createRental = async (rental: CreateRentalInterface, user): Promise<RentalInterface> => {
    try {
      let temp: any;
      temp = rental;
      temp.userId = user.userId;
      const upload: RentalInterface = temp;
      const document = await new this.rentalModel(upload);
      await document.save();
      let lean: any;
      lean = document;
      return lean;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Query rentals in the database with the data provided in the SearchRentalDto
   * @param rental SearchRentalDto
   */
  searchRental = async (rental: SearchRentalInterface): Promise<RentalInterface[]> => {
    console.log(rental);
    try {
      const query: RentalQuery = await this.createRentalQuery(rental);
      const rentals = await this.rentalModel.find({query}).lean();
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
   * **summary**: Edit the rental pricing
   * - price
   * - discounts:
   *   - weekly
   *   - monthly
   * @param data The request dto
   */
  editPricing = async (data: EditPricingInterface): Promise<RentalInterface> => {
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
      const updater: EditPricingUpdater = {
        $set: update,
      };
      const doc = await this.rentalModel.findOneAndUpdate({filter}, {updater}, {useFindAndModify: false}).lean();
      return doc;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Edit the details of the Rental (# of seats, color, etc.)
   * @param data The data comes as an EditDetailsDto
   */
  editDetails = async (data: EditDetailsInterface): Promise<RentalInterface> => {
    // make an update document
    try {
      const filter = { _id: data.rentalId };
      const update = {
        specs: data.specs,
        features: data.features,
      };
      const updater: EditDetailsUpdater = {
        $set: update,
      };
      const doc = await this.rentalModel.findOneAndUpdate(filter, {updater}, {useFindAndModify: false }).lean();
      return doc;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Set a period of unavailability for the rental (e.g. mon - wed)
   * @param processed The validated and organized requested unavailability
   */
  scheduleUnavailability = async (processed: ScheduleUnavailabilityInterface): Promise<UnavailabilityInterface[]> => {
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
   * **summary**: Edit a block of scheduled unavailability by either extending or reducing the scheduled duration of time on the rental
   * @param data The mongoDB updater and filter
   */
  updateUnavailability = async (data: UpdateUnavailabilityDataInterface): Promise<UpdateResponseInterface> => {
    // send the update
    try {
      const update = await this.unavailability.updateMany(
        data.filter,
        {upater: data.updater},
      );
      return update;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Remove an amount of time from a scheduled duration of unavailability on the rental
   * @param data Rental_id and unavailability_id
   */
  removeUnavailability = async (data: RemoveUnavailabilityInterface): Promise<DeleteResponseInterface> => {
    try {
      const remove = await this.unavailability.remove({
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
   * **summary**: Convert a searchRentalDto into a mongoose query for the searchRental method
   * - The query searchs a maxium 8 mile radius for rentals
   * - Filters:
   *   - rental min duration
   *   - rental max duration
   *   - advance notice minimum; e.g. 1 hour
   *   - loc: GeoJSON object
   *   - rental price: optional
   *   - rental features: optional
   * @param rental SearchRentalDto
   */
  private createRentalQuery = async (rental: SearchRentalInterface): Promise<RentalQuery> => {
    try {
      const query: RentalQuery = {
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
   * **summary**: Validate there currently is no scheduled unavailability for the rental in the database that overlaps
   * with the requested unavailability
   * @param data Query for 1 or 2 years
   */
  private checkForOverlap = async (data: ScheduleUnavailabilityInterface): Promise<void> => {
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
}
