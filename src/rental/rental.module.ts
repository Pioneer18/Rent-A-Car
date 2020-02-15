import { Module } from '@nestjs/common';
import { RentalController } from './controller/rental.controller';
import { RentalService } from './service/rental.service';

@Module({
  imports: [],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [],
})
export class RentalModule {}
