import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { jwtConstants } from './constant';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth.controller';
import { RedisModule } from '../redis/redis.module';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { ExtractKeyValueUtil } from './util/extract-key-value.util';
import { AppConfigModule } from '../config/configuration.module';
import { VerifyNewPasswordUtil } from './util/verify-new-password.util';
import { EmailService } from '../email/email.service';
import { AppConfigService } from '../config/configuration.service';
import { RedisService } from '../redis/service/redis.service';
/**
 * **summary**: This module provides all of the functionality for authenticating and authorizing a user
 */
@Module({
  imports: [
    AppConfigModule,
    ConfigModule,
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: `${jwtConstants.jwt_exp_time}s`}, // add this expiresIn value to the `jwtConstants` object
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LoggedOutGuard, 
    ExtractKeyValueUtil,
    VerifyNewPasswordUtil,
    EmailService,
    AppConfigService,
    RedisService
  ],
  exports: [AuthService, LoggedOutGuard, ExtractKeyValueUtil, VerifyNewPasswordUtil],
  controllers: [AuthController],
})
export class AuthModule {}
