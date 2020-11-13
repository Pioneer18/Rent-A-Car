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

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'}, // 1 hour token time
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil],
  exports: [AuthService, LoggedOutGaurd, ExtractKeyValueUtil, ExtractEmailUtil],
  controllers:[AuthController],
})
export class AuthModule {}
