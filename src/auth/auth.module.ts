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
import { RedisModule } from 'src/redis/redis.module';
import { LoggedOutGaurd } from './gaurds/logged-out.guard';
import { ExtractKeyValueUtil } from './util/extract-key-value.util';
import { ExtractEmailUtil } from 'src/common/util/extract-email.util';
import { AppConfigModule } from 'src/config/configuration.module';
import { AppConfigService } from 'src/config/configuration.service';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule,
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (appConfig: AppConfigService) => ({
        secret: appConfig.secret_key,
        signOptions: {expiresIn: `${appConfig.jwt_exp_time}s`}, // 30 minutes
      })
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil],
  exports: [AuthService, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil],
  controllers:[AuthController],
})
export class AuthModule {}
