import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';
import { GeoUrlApiUtil } from './utils/geo-url-api.util';
import { UnavailabilitySchema } from './schema/unavailability-schema';
import { DatabaseModule } from '../database/database.module';
import { unavailabilityProvider } from '../database/providers/unavailability-model.provider';
import { ValidateUpdateUnavailabilityMiddleware } from './middleware/validate-update-unavailability.middleware';
/**
 * - **Rental Module**: This module provides all of the functionality for working with Rentals
 * - **Middleware**: This module consumes the **ValidateUpdateUnavailability** middleware; for more details, in the documentation checkout the **Injectables** ValidateUpdateUnavailability tab
 * - **Database**: This module applies indexing to the **Unavailability** model of the database
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
    MongooseModule.forFeature([{name: 'Unavailability', schema: UnavailabilitySchema}]),
    DatabaseModule,
  ],
  controllers: [RentalController],
  providers: [RentalService, GeoUrlApiUtil, ...unavailabilityProvider],
  exports: [RentalService],
})
export class RentalModule implements NestModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
    UnavailabilitySchema.index({rentalId: 1});
    UnavailabilitySchema.index({UnavailabilityId: 1});
  }
  /**
   * summary: applies the ValidateUpdateUnavailability which validates a user's request to the rental.controller.updateUnavaialability method
   * @param consumer interfacing defining method for applying user defined middleware to routes
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUpdateUnavailabilityMiddleware)
      .forRoutes('v1/rental');
  }
}
