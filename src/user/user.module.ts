import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema'
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { DatabaseModule } from '../database/database.module';
import { ValidateEmailMiddleware } from './middleware/validate-email.middleware';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    DatabaseModule
  ],
  providers: [UserService],
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
