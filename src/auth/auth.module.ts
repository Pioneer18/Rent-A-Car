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
import { LoggedOutGaurd } from './gaurds/logged-out.guard';
import { ExtractKeyValueUtil } from './util/extract-key-value.util';
import { ExtractEmailUtil } from '../common/util/extract-email.util';
import { AppConfigModule } from '../config/configuration.module';
import { VerifyNewPasswordUtil } from './util/verify-new-password.util';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule,
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: jwtConstants.jwt_exp_time}, // add this expiresIn value to the `jwtConstants` object
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil, VerifyNewPasswordUtil, EmailService],
  exports: [AuthService, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil, VerifyNewPasswordUtil, EmailService],
  controllers:[AuthController],
})
export class AuthModule {}
