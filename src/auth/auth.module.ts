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
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggedOutGaurd],
  exports: [AuthService, LoggedOutGaurd],
  controllers:[AuthController],
})
export class AuthModule {}
