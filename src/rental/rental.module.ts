import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';
import { GeoUrlApiUtil } from './utils/geo-url-api.util';
import { UnavailabilitySchema } from './schema/unavailability-schema';
import { DatabaseModule } from '../database/database.module';
import { unavailabilityProvider } from '../database/providers/unavailability-model.provider';
import { ValidateUpdateUnavailabilityMiddleware } from './middleware/validate-update-unavailability.middleware';
import { MapNewRentalPipe } from './pipes/map-new-rental.pipe';
import { GeoUrlApiPipe } from './pipes/geo-url-api.pipe';
import { RequestCoordinatesPipe } from './pipes/request-coordinates.pipe';
import { RentalDurationPipe } from './pipes/rental-duration.pipe';
import { GivenNoticePipe } from './pipes/given-notice.pipe';
import { PricingPipe } from './pipes/pricing.pipe';
import { ValidateEditDetailsPipe } from './pipes/validate-edit-details.pipe';
import { ProcessUnavailabilityPipe } from './pipes/process-unavailability.pipe';
import { ValidateUnavailabilityPipe } from './pipes/validate-unavailability.pipe';
import { SortUnavailabilityPipe } from './pipes/sort-unavailability.pipe';
import { CreateUpdaterDtoPipe } from './pipes/create-updater-dto.pipe';
import { ValidateRemoveUnavailabilityPipe } from './pipes/validate-remove-unavailability.pipe';
import { AppConfigService } from 'src/config/configuration.service';
import { GenerateRentalDurationEnumUtil } from './utils/generate-rental-duration-enum.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { unavailabilityModel } from '../common/Const';
/**
 * - **summary**: This module provides all of the functionality for working with Rentals
 * - **Middleware**: This module consumes the **ValidateUpdateUnavailability** middleware; for more details, in the documentation checkout the **Injectables** ValidateUpdateUnavailability tab
 * - **Database**: This module applies indexing to the **Unavailability** model of the database
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
    MongooseModule.forFeature([{name: unavailabilityModel, schema: UnavailabilitySchema}]),
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [RentalController],
  providers: [
    RentalService,
    GeoUrlApiUtil,
    ...unavailabilityProvider,
    MapNewRentalPipe,
    GeoUrlApiPipe,
    RequestCoordinatesPipe,
    RentalDurationPipe,
    GenerateRentalDurationEnumUtil,
    GivenNoticePipe,
    PricingPipe,
    ValidateEditDetailsPipe,
    ProcessUnavailabilityPipe,
    ValidateUnavailabilityPipe,
    SortUnavailabilityPipe,
    CreateUpdaterDtoPipe,
    ValidateRemoveUnavailabilityPipe,
    AppConfigService,
    ConfigService,
  ],
  exports: [RentalService],
})
export class RentalModule implements NestModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
    UnavailabilitySchema.index({rentalId: 1});
    UnavailabilitySchema.index({UnavailabilityId: 1});
  }
  /**
   * **summary**: applies the ValidateUpdateUnavailability which validates a user's request to the rental.controller.updateUnavaialability method
   * @param consumer interfacing defining method for applying user defined middleware to routes
   */
  configure = (consumer: MiddlewareConsumer) => {
    consumer
      .apply(ValidateUpdateUnavailabilityMiddleware)
      .forRoutes('v1/rental');
  }
}
