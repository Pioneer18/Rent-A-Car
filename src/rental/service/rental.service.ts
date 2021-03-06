import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalModelInterface } from '../interface/modelInterface/Rental/rental-model.interface';
import { RentalInterface } from '../interface/rental.interface';
import { SearchRentalInterface } from '../interface/service/search-rental.interface';
import { CreateRentalInterface } from '../interface/service/create-rental.interface';
import { EditPricingInterface } from '../interface/service/edit-pricing.interface';
import { EditPricingUpdater } from '../interface/service/edit-pricing-updater.interface';
import { EditDetailsInterface } from '../interface/service/edit-details.interface';
import { DeleteResponseInterface } from '../../common/interfaces/delete-response.interface';
import { MapRentalUtil } from '../utils/map-rental.util';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { RadiusToMeters } from '../utils/radius-to-meters';

/**
 * **summary**: Create, search for near (within a radius: e.g. 10 miles of) a location, update details, and schedule blocks of unavailable time for Rentals
 */
@Injectable()
export class RentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalModelInterface>,
    // @InjectModel(unavailabilityModel) private readonly unavailability: Model<UnavailabilityModelInterface>,
    private readonly mapRentalUtil: MapRentalUtil,
    private readonly radiusToMeters: RadiusToMeters
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
      return await this.mapRentalUtil.map(document);
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
      // call a sendRequest funciton
      const rentals = await this.sendRequest(rental);
      // const rentals = await this.rentalModel.find({ loc: query.loc }).where('pricing.price').lte(30);
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
   * **summary**: Query the current user's rentals
   * @param user The user's id 
   */
  userRentals = async (user: JwtPayloadInterface): Promise<RentalInterface[]> => {
    try {
      const rentals = await this.rentalModel.find({ userId: user.userId }).lean();
      return rentals;
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
      const update: EditPricingUpdater = {
        pricing: {
          price: data.price,
          discounts: {
            weekly: data.discounts.weekly,
            monthly: data.discounts.monthly,
          },
        },
      };
      const doc = await this.rentalModel.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true }).lean();
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
      const update: any = { // type assertion; the EditDetailsInterface's opitional properties conflict with the model
        specs: data.specs,
        features: data.features,
      };
      return await this.rentalModel.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true }).lean();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: Remove the selected rental
   * @param rentalId string 
   */
  removeRental = async (rentalId: string): Promise<DeleteResponseInterface> => {
    try {
      const remove = await this.rentalModel.remove({ _id: rentalId })
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
  private sendRequest = async (rental: SearchRentalInterface): Promise<any> => {
    try {
      console.log(JSON.stringify(rental))
      // convert radius to meters
      const radius = this.radiusToMeters.convert(rental.radius);
      const query = {
        loc: {
          $near: {
            // There should be distance enum
            $maxDistance: radius,
            $geometry: {
              type: rental.loc.type,
              coordinates: [
                rental.loc.coordinates[0], // latitude
                rental.loc.coordinates[1], // longitude
              ],
            },
          },
        }
      }
      let rentals: any;
      // request with each filter option
      if (rental.price === null || rental.features === null || rental.rentalDuration === null) {
        console.log('INSIDE QUERY FILTER')
        // only price
        if (rental.price !== null && rental.features === null && rental.rentalDuration === null) {
          console.log('ONLY PRICE')
          rentals = await this.rentalModel.find(query)
            .where('pricing.price').lte(rental.price)
        }
        // only features
        if (rental.features !== null && rental.price === null && rental.rentalDuration === null) {
          console.log('ONLY features ')
          rentals = await this.rentalModel.find(query)
            .where('features').in(rental.features)
        }
        // only scheduling
        if (rental.rentalDuration !== null && rental.price === null && rental.features === null) {
          console.log('ONLY scheduling ')
          rentals = await this.rentalModel.find(query)
            .where('scheduling.rentMinDuration').lte(rental.rentalDuration)
            .where('scheduling.rentMaxDuration').gte(rental.rentalDuration)
            .where('scheduling.requiredNotice').lte(rental.givenNotice)
        }
        // price and scheduling
        if (rental.price !== null && rental.rentalDuration !== null && rental.features === null) {
          console.log('PRICE AND SCHEDULING')
          rentals = await this.rentalModel.find(query)
            .where('pricing.price').lte(rental.price)
            .where('scheduling.rentMinDuration').lte(rental.rentalDuration)
            .where('scheduling.rentMaxDuration').gte(rental.rentalDuration)
            .where('scheduling.requiredNotice').lte(rental.givenNotice)
        }
        // price and features
        if (rental.price !== null && rental.features !== null && rental.rentalDuration === null) {
          console.log('PRICE AND FEATURES')
          rentals = await this.rentalModel.find(query)
            .where('pricing.price').lte(rental.price)
            .where('features').in(rental.features)
        }
        // features and scheduling
        if (rental.features !== null && rental.rentalDuration !== null && rental.givenNotice !== null && rental.price === null) {
          console.log('FEATURES AND SCHEDULING')
          rentals = await this.rentalModel.find(query)
            .where('scheduling.rentMinDuration').lte(rental.rentalDuration)
            .where('scheduling.rentMaxDuration').gte(rental.rentalDuration)
            .where('scheduling.requiredNotice').lte(rental.givenNotice)
            .where('features').in(rental.features)
        }
        // only loc
        if (rental.features === null && rental.rentalDuration === null && rental.givenNotice === null && rental.price === null) {
          console.log('LOC ONLY')
          rentals = await this.rentalModel.find(query);
        }
      }
      else {// query with every option
        console.log('EVERYTHING')
        rentals = await this.rentalModel.find(query)
          .where('pricing.price').lte(rental.price)
          .where('scheduling.rentMinDuration').lte(rental.rentalDuration)
          .where('scheduling.rentMaxDuration').gte(rental.rentalDuration)
          .where('scheduling.requiredNotice').lte(rental.givenNotice)
          .where('features').in(rental.features)
      }

      console.log('Rental Query')
      console.log(rentals)
      return rentals;
    } catch (err) {
      throw new Error(err);
    }
  }
}
