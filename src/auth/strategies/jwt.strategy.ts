
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant';
import { Request } from 'express';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';
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
   * **summary**: Return the decoded payload of the JWT
   * @param payload
   */
  validate = async (payload: any): Promise<JwtPayloadInterface> => {
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}
