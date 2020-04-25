import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // used in the AuthService
})
export class UserModule {}
