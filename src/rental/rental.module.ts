import { Module } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';
import { GeoUrlApiUtil } from './utils/geo-url-api.util';
import { UnavailabilitySchema } from './schema/validation/unavailability-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
    MongooseModule.forFeature([{name: 'Unavailability', schema: UnavailabilitySchema}]),
  ],
  controllers: [RentalController],
  providers: [RentalService, GeoUrlApiUtil],
  exports: [],
})
export class RentalModule {
  constructor() {
    RentalSchema.index({ loc: '2dsphere' });
    UnavailabilitySchema.index({rentalId: true});
  }
}
