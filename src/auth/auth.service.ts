import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { JwtService } from '@nestjs/jwt';

/**
 * Passport Local
 * Retrieve a user and verify their password with ValidateUser()
 */
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUser(username);
        if (user && user.password === pass) {
            const {password, ...result } = user;
            // return everything but the password
            return result;
        }
        return null;
    }

    // use the sign method to create a JWT from the username and password
    // using sub for userId is consistent with JWT standards
    async login(user: any) {
        const payload = {username: user.name, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
