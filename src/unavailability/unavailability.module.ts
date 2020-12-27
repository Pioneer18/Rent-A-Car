import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { unavailabilityModel } from '../common/Const';
import { PickupUnavailabilityValidationMiddleware} from './middleware/pickup-unavailability-validation.middleware'
import { UnavailabilityController } from './controller/unavailability.controller';
import { UnavailabilitySchema } from './schema/unavailability-schema';
import { UnavailabilityService } from './service/unavailability.service';
import { RedisModule } from '../redis/redis.module';
import { LuxonUtil } from '../common/util/luxon-util';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: unavailabilityModel, schema: UnavailabilitySchema }]),
    RedisModule
  ],
  controllers: [UnavailabilityController],
  providers: [
    UnavailabilityService,
    LuxonUtil
  ],
  exports: [UnavailabilityService]
})
export class UnavailabilityModule {
  constructor() { }
  /**
   * **summary**: applies the ValidateUpdateUnavailability which validates a user's request to the rental.controller.updateUnavaialability method
   * @param consumer interfacing defining method for applying user defined middleware to routes
   */
  configure = (consumer: MiddlewareConsumer) => {
    consumer
      .apply(PickupUnavailabilityValidationMiddleware)
      .forRoutes('v1/unavailability');
  }
}
