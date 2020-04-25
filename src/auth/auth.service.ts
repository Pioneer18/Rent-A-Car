import { Injectable } from '@nestjs/common';
import {UserService} from '../user/service/user.service';

/**
 * Passport Local
 * Retrieve a user and verify their password with ValidateUser()
 */
@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUser('tee-hee');
        if (user && user.password === pass) {
            const {password, ...result } = user;
            // return everything but the password
            return result;
        }
        return null;
    }
}
