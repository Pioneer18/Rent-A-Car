import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UserPropertyInterface } from '../interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../user/interface/user.interface';
import { Request } from 'express';
import { RedisService } from '../../redis/service/redis.service';

/**
 * Passport Local
 * Retrieve a user and verify their password with ValidateUser()
 * Create a JWT from the validated user's id and username
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {}

    /**
     * Initial User Validation
     * @param email 
     * @param pass 
     */
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

    /**
     * Login
     * @param user 
     */
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

    /**
     * Logout
     * @param user user property from the request object
     * summary: set the user's JWT in the redis 'dead-list'
     */
    async logout(req: Request) {
        const rawAuth = req.headers.authorization;
        console.log(rawAuth);
        const jwt = rawAuth.slice(7);
        console.log(jwt);
    
        // use the redis client to push the user's jwt to the 'dead-list'
        return await rawAuth;
    }

}
