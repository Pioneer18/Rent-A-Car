import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * **summary**: The guard the calls the [**Passport local-strategy**](http://www.passportjs.org/packages/passport-local/)
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
