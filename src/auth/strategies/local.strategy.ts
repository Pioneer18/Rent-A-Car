/**
 * summary: Setup the [**Passport Local Strategy**](http://www.passportjs.org/packages/passport-local/)
 */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ValidateUserReturn } from '../interfaces/service/validate-user-return.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({usernameField: 'email' }); // use email instead of username
    }

    /**
     * **summary**: Every passport strategy calls the validate method (which calls the validateUser function in the auth.service) for any strategy.
     * if the user is found, Passport will create a user property on the request object
     * @param email the user email
     * @param password the user password
     */
    validate = async (email: string, password: string): Promise<ValidateUserReturn> => {
        const user = await this.authService.validateUser({email, pass: password});
        if (!user) {
            throw new Error('invalid credentials');
            // throw new UnauthorizedException('invalid credentials');
        }
        return user;
    }
}
