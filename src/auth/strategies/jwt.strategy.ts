
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from 'src/config/configuration.service';
/**
 * Read the JWT from the Cookie header when user requests data
 * grab the 'Authentication' cookie from the request header
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly appConfig: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: appConfig.secret_key,
    });
  }

  async validate(payload: any) {
    console.log('Hello from inside the jwt-strategy! :)')
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}