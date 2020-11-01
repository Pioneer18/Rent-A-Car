import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema'
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // used in the AuthService
})
export class UserModule  {
  constructor() {
    UserSchema.index({userId: 1});
  }
}
