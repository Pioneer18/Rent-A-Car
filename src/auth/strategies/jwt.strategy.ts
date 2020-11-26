
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant';
import { Request } from 'express'
/**
 * **summary**: [**Passport Jwt-Strategy**](http://www.passportjs.org/packages/passport-jwt/)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // read JWT from the Cookie Header
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * **summary**: return the decoded payload of the JWT
   * @param payload 
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}