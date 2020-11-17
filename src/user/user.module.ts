import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema'
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { DatabaseModule } from '../database/database.module';
import { ValidateEmailMiddleware } from './middleware/validate-email.middleware';
import { userProvider} from '../database/providers/user-model.provider';
import { RedisModule } from '../redis/redis.module';
import { ExtractKeyValueUtil } from '../auth/util/extract-key-value.util';
import { AppConfigModule } from '../config/configuration.module';
import { VerifyNewPasswordUtil } from '../auth/util/verify-new-password.util';
import { RedisService } from '../redis/service/redis.service';
import { ExtractUserUtil } from './util/extract-user.util';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    DatabaseModule,
    RedisModule,
    AppConfigModule,
    RedisModule
  ],
  providers: [UserService,...userProvider, ExtractKeyValueUtil, VerifyNewPasswordUtil, RedisService, ExtractUserUtil],
  controllers: [UserController],
  exports: [UserService], // used in the AuthService
})
export class UserModule  {
  constructor() {
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateEmailMiddleware)
      .forRoutes('v1/user')
  }
}
