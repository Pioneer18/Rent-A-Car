import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UserPropertyInterface } from './interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/interface/user.interface';

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
        try{
            const query: FindUserDto = { username: username}
            const temp = await this.userService.findUser(query); // find user in db by username
            const user: UserInterface = temp[0];
            // validate the given password
            if(await bcrypt.compare(pass, user.password)) {
                const {password, ...result } = user;
                return result;
            }
            return null;
        } catch (err) {
            throw new Error(err);
            // catch and report the unique email error
        }
    }

    // use the sign method to create a JWT from the username and userid
    // using sub for userId is consistent with JWT standards
    async login(user: any) {
        console.log(`here is the user property created by Passport`)
        console.log(user._doc)
        const packet: UserPropertyInterface = user._doc;

        const payload = {
            username: packet.username,
            email: packet.email,
            sub: packet._id,
            // iat:
        };
        return {
            access_token: await this.jwtService.sign(payload), // create a JWT 
        };
    }
}
