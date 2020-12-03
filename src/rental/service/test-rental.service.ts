import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentalModelInterface } from '../interface/modelInterface/Rental/rental-model.interface';
import { Injectable } from '@nestjs/common';

/**
 * Test Rental Service provides access to private methods for Unit Testing
 */
@Injectable()
export class TestRentalService {
  constructor(
    @InjectModel('Rental') private readonly rentalModel: Model<RentalModelInterface>,
  ) {}

  async returnRentalModel() {
    return this.rentalModel;
  }

  async createRentalQuery(rental) {
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

}
