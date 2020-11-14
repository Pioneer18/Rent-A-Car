import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UserPropertyInterface } from '../interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../user/interface/user.interface';
import { Request } from 'express';
import { RedisService } from '../../redis/service/redis.service';
import { ExtractKeyValueUtil } from '../util/extract-key-value.util';
import { ExtractEmailUtil } from 'src/common/util/extract-email.util';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { VerifyNewPasswordUtil } from '../util/verify-new-password.util';

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
        private readonly extractKeyValueUtil: ExtractKeyValueUtil,
        private readonly extractEmailUtil: ExtractEmailUtil,
        private readonly verifyNewPasswordUtil: VerifyNewPasswordUtil,
    ) { }

    /**
     * Initial User Validation
     * @param email 
     * @param pass 
     */
    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const query: FindUserDto = { email: email };
            const user: UserInterface = await this.userService.findUser(query); // find user in db by username
            // validate the given password
            if (await bcrypt.compare(pass, user.password)) {
                const { password, ...result } = user;
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
        try {
            // extract the jwt and the cachce key
            const { key, jwt } = await this.extractKeyValueUtil.extract(req);
            // save jwt to redis dead-list with key
            await this.redisService.set(key, jwt);
            // return success or error
            return { key: key, value: jwt };
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Change Password
     * @param new_password
     * @param confirm_password
     * @param req
     */
    async changePassword(data: ChangePasswordDto, req: Request) {
        try {
            console.log('Change Password Data:')
            console.log(data);
            // verify user submitted same pw twice
            await this.verifyNewPasswordUtil.checkTypos({ newPassword: data.newPassword, confirmPassword: data.confirmPassword });
            // extract the email from the jwt
            const { jwt, key } = await this.extractKeyValueUtil.extract(req);
            const email = await this.extractEmailUtil.extract(jwt);
            // find user document
            const user = await this.userService.findUser({email: email});
            // verify new password does not match current password
            await this.verifyNewPasswordUtil.verifyNew({ newPassword: data.newPassword, oldPassword: user.password });
            // update the user's password
            user.password = await bcrypt.hash(data.newPassword, 10);
            user.save();
            // logout the user, they'll need to log back in
            await this.redisService.set(key, jwt);
            // redirect to login page 
            console.log('redirect to login page...');
            return;
        } catch (err) {
            throw new Error(err);
        };
    }


    /**
     * Forgot Password
     * @param email the email for resetting the password
     * summary: sends user a reset password link to the provided email, if it's an account associated email
     */
    async forgotPassword() {

    }

    /**
     * Reset Password
     * summary: resets the password from a submitted forgot-password email
     */
    async resetPassword() {

    }

}
