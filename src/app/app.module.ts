import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app/app.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AppModule, VehicleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
