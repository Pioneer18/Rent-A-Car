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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
    MongooseModule.forFeature([{name: 'Unavailability', schema: UnavailabilitySchema}]),
    DatabaseModule,
  ],
  controllers: [RentalController],
  providers: [RentalService, GeoUrlApiUtil, ...unavailabilityProvider],
  exports: [],
})
export class RentalModule implements NestModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
    UnavailabilitySchema.index({rentalId: 1});
    UnavailabilitySchema.index({title: 1});
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUpdateUnavailabilityMiddleware)
      .forRoutes('v1/rental');
  }
}
