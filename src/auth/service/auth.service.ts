import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from '../../user/dto/find-user.dto';
import { UserPropertyInterface } from '../interface/user-property.interface';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../user/interface/user.interface';
import { Request } from 'express';
import { RedisService } from '../../redis/service/redis.service';
import { ExtractKeyValueUtil } from '../util/extract-key-value.util';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { VerifyNewPasswordUtil } from '../util/verify-new-password.util';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { EmailService } from '../../email/email.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AppConfigService } from '../../config/configuration.service';
import { ExtractUserUtil } from '../../user/util/extract-user.util';

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
        private readonly verifyNewPasswordUtil: VerifyNewPasswordUtil,
        private readonly emailService: EmailService,
        private readonly appConfig: AppConfigService,
        private readonly extractUserUtil: ExtractUserUtil
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
            await this.verifyNewPasswordUtil.verifyMatch({newPassword: pass, oldPassword: user.password});
            const { password, ...result } = user;
            return result;
        } catch (err) {
            throw new Error(err);
            // catch and report the unique email error
        }
    }

    /**
     * Login (Assign a JWT)
     * @param user 
     */
    async login(user: any) {
        console.log(`here is the user property created by Passport`)
        console.log(user._doc)
        const packet: UserPropertyInterface = user._doc;
        // create the JWT payload
        const payload = {
            username: packet.username,
            email: packet.email,
            sub: packet._id,
        };
        // create JWT and return as a Cookie string
        const token = await this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.appConfig.jwt_exp_time}`;
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
            // extract the user
            const doc = await this.extractUserUtil.extract(req)
            // extract the jwt and key
            const { jwt, key } = await this.extractKeyValueUtil.extract(req);
            // find user document
            const user = await this.userService.findUser({email: doc.email});
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
    async forgotPassword(data: ForgotPasswordDto) {
        try {
            // query user and confirm they exist
            const user = await this.userService.findUser({email: data.email});
            if (!user) { throw new Error('There is no User registered with the provided email')}
            // set the reset-token and it's expiration on the user document
            user.setResetToken();
            user.setExpirationDate();
            user.save();
            // create mail options
            const mailOptions = await this.emailService.createMailOptions(user.email);
            const result = await this.emailService.sendMail(mailOptions);
            return user.resetPasswordToken;
        } catch(err) { 
            throw new Error(err);
        }
    }

    /**
     * Reset Password 
     * @param email
     * @param newPassword
     * @param confirmPassword
     * summary: resets the password from a submitted forgot-password email
     */
    async resetPassword(data: ResetPasswordDto) {
        // check new password for typos
        await this.verifyNewPasswordUtil.checkTypos({newPassword: data.confirmPass, confirmPassword: data.resetPass});
        // query user by resetToken
        const user = await this.userService.findUserByResetPasswordToken({token: data.resetPasswordToken});
        // check reset token has not expired
        if (Date.now() >= user.resetPasswordExpires) { throw new Error('This passowrd reset request has expired, please make a new request.')}
        // verify new password is actually new
        await this.verifyNewPasswordUtil.verifyNew({newPassword: data.resetPass, oldPassword: user.password})
        // update user password
        user.password = await bcrypt.hash(data.resetPass, 10);
        // reset the 'reset tokens' to null
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        // save the user
        await user.save();
        // redirect to login
        return;
    }

}
