import { Module } from '@nestjs/common';
import { VehicleController } from './controller/vehicle.controller';
import { VehicleService } from './service/vehicle.service'

@Module({
  imports: [],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [],
})
export class VehicleModule {}
