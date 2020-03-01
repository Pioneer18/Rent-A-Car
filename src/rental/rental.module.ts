import { Module } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';
import { GeoUrlApiUtil } from './utils/geo-url-api.util';
import { UnavailabilitySchema } from './schema/validation/unavailability-schema';
import { DatabaseModule } from 'src/database/database.module';
import { unavailabilityProvider } from 'src/database/providers/unavailability-model.provider';

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
export class RentalModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
    UnavailabilitySchema.index({rentalId: true});
  }
}
