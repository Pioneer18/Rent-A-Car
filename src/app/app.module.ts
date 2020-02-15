import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [AppModule, VehicleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
