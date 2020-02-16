import { Module } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from './schema/rental.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
  ],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [
    MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
  ],
})
export class RentalModule {
  constructor() {
    RentalSchema.index({ 'locationAndDelivery.loc': '2dsphere' });
  }
}
