import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UserPropertyInterface } from '../interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/interface/user.interface';
import { AppConfigService } from 'src/config/configuration.service';

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
        private appConfig: AppConfigService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        try{
            const query: FindUserDto = {email: email};
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

    async getCookieWithJwtToken(userId: string) {
        const payload = {userId}
        const token = this.jwtService.sign(payload);
        return `Authenticaiton=${token}; HttpOnly; Path=/; Max-Age=${this.appConfig.jwt_exp_time}`;
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
        };
        return {
            access_token: await this.jwtService.sign(payload), // create a JWT 
        };
    }
}
