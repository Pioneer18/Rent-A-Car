import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';

/**
 * Passport Local
 * Retrieve a user and verify their password with ValidateUser()
 * Create a JWT from the validated user's id and username
 */
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const query: FindUserDto = { username: username}
        const user = await this.userService.findUser(query); // find user in db by username
        console.log('user returned from userservice, inside the validateUser function: ' + user)
        if (user && user.password === pass) {
            const {password, ...result } = user;
            // return everything but the password
            console.log('Here is the `result`: ' + result);
            return result;
        }
        return null;
    }

    // use the sign method to create a JWT from the username and userid
    // using sub for userId is consistent with JWT standards
    async login(user: any) {
        const payload = {username: user.name, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
