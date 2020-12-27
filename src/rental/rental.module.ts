import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';
import { GeoUrlApiUtil } from './utils/geo-url-api.util';
import { DatabaseModule } from '../database/database.module';
// import { unavailabilityProvider } from '../database/providers/unavailability-model.provider';
// import { ValidateUpdateUnavailabilityMiddleware } from './middleware/validate-update-unavailability.middleware';
import { MapNewRentalPipe } from './pipes/map-new-rental.pipe';
import { GeoUrlApiPipe } from './pipes/geo-url-api.pipe';
import { RequestCoordinatesPipe } from './pipes/request-coordinates.pipe';
import { RentalDurationPipe } from './pipes/rental-duration.pipe';
import { RentalSearchFilterPipe } from './pipes/rental-search-filter.pipe';
import { PricingPipe } from './pipes/pricing.pipe';
import { ValidateEditDetailsPipe } from './pipes/validate-edit-details.pipe';
// import { ProcessUnavailabilityPipe } from './pipes/process-unavailability.pipe';
// import { ValidateUnavailabilityPipe } from './pipes/validate-unavailability.pipe';
// import { SortUnavailabilityPipe } from './pipes/sort-unavailability.pipe';
import { CreateUpdaterDtoPipe } from './pipes/create-updater-dto.pipe';
import { ValidateRemoveUnavailabilityPipe } from './pipes/validate-remove-unavailability.pipe';
import { AppConfigService } from '../config/configuration.service';
import { GenerateRentalDurationEnumUtil } from './utils/generate-rental-duration-enum.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MapRentalUtil } from './utils/map-rental.util';
import { ToItemsIndexes } from '../common/util/to-item-indexes';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/service/redis.service';
import { RadiusToMeters } from './utils/radius-to-meters';
/**
 * - **summary**: This module provides all of the functionality for working with Rentals
 * - **Middleware**: This module consumes the **ValidateUpdateUnavailability** middleware; for more details, in the documentation checkout the **Injectables** ValidateUpdateUnavailability tab
 * - **Database**: This module applies indexing to the **Unavailability** model of the database
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
    DatabaseModule,
    ConfigModule,
    RedisModule
  ],
  controllers: [RentalController],
  providers: [
    RentalService,
    GeoUrlApiUtil,
    // ...unavailabilityProvider,
    MapNewRentalPipe,
    GeoUrlApiPipe,
    RequestCoordinatesPipe,
    RentalDurationPipe,
    GenerateRentalDurationEnumUtil,
    RentalSearchFilterPipe,
    PricingPipe,
    ValidateEditDetailsPipe,
    // ProcessUnavailabilityPipe,
    // ValidateUnavailabilityPipe,
    // SortUnavailabilityPipe,
    CreateUpdaterDtoPipe,
    ValidateRemoveUnavailabilityPipe,
    AppConfigService,
    ConfigService,
    MapRentalUtil,
    ToItemsIndexes,
    RedisService,
    RadiusToMeters
  ],
  exports: [RentalService],
})
export class RentalModule implements NestModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
  }
  /**
   * **summary**: applies the ValidateUpdateUnavailability which validates a user's request to the rental.controller.updateUnavaialability method
   * @param consumer interfacing defining method for applying user defined middleware to routes
   */
  configure = () => {
    //
  }
}
