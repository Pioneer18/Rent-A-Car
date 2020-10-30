/**
 * Passport Local Strategy
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // no config for passport local strategy
    }

    // every passport strategy calls the validate method (which calls the validateUser function in the auth.service)
    // for any strategy, if the user is found, Passport will create a user property on the request object
    // the biggest difference is how each strategy determines if a user exists
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('invalid credentials');
        }
        // call the login and return the jwt?
        return user;
    }
}
