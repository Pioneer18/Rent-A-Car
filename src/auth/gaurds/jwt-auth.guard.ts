import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * **summary**: The guard that calls the [**Passport jwt-strategy**](http://www.passportjs.org/packages/passport-jwt/)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}