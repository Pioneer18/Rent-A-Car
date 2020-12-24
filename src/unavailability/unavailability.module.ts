import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { unavailabilityModel } from 'src/common/Const';
import { ValidateUpdateUnavailabilityMiddleware } from 'src/rental/middleware/validate-update-unavailability.middleware';
import { UnavailabilityController } from './controller/unavailability.controller';
import { UnavailabilitySchema } from './schema/unavailability-schema';
import { UnavailabilityService } from './service/unavailability.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: unavailabilityModel, schema: UnavailabilitySchema }])
  ],
  controllers: [UnavailabilityController],
  providers: [UnavailabilityService]
})
export class UnavailabilityModule {
  constructor() { }
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
