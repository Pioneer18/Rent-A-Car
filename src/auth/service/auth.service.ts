import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UserPropertyInterface } from '../interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/user/interface/user.interface';
import { AppConfigService } from 'src/config/configuration.service';
import { Response } from 'express';

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

    // use the sign method to create a JWT from the username and userid
    // using sub for userId is consistent with JWT standards
    // return JWT to be stored in the response header
    async login(user: any, res: Response) {
        console.log(`here is the user property created by Passport`)
        console.log(user._doc)
        // 1) create payload
        const packet: UserPropertyInterface = user._doc;
        const payload = {
            username: packet.username,
            email: packet.email,
            sub: packet._id,
        };
        // 2) make a JWT token from payload
        const token = await this.jwtService.sign(payload);
        // 3) set the response Cookie header with the JWT
        const cookie = `Authenticaiton=${token}; HttpOnly; Path=/; Max-Age=${this.appConfig.jwt_exp_time}`
        res.setHeader('Set-Cookie', cookie)
        // 5) return the user object with no password;
        packet.password = undefined;
        return res.send(packet);

    }
}
