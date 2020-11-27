import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from '../../user/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../user/interface/modelInterface/user.interface';
import { Request } from 'express';
import { RedisService } from '../../redis/service/redis.service';
import { ExtractKeyValueUtil } from '../util/extract-key-value.util';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { VerifyNewPasswordUtil } from '../util/verify-new-password.util';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { EmailService } from '../../email/email.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AppConfigService } from '../../config/configuration.service';

/**
 * **summary**: provide the functionality to authenticate and authorize a user
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
    ) { }

    /**
     * **summary**:  find the user in the database and authenticate their access to the application by verifying the present user credentials in the database
     * - note: depends on the userService.findUser() and verifyNewPasswordUtil.verifyMatch() methods
     * @param email the user email
     * @param pass the user password
     */
    validateUser = async(email: string, pass: string): Promise<any> => {
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
     * summary: return a JWT inside of a Cookie, which may only be interacted with by Http and not Javascript, to the now authenticated user
     * @param user the user logging into the application
     */
    login = async(user: any) => {
        console.log(`here is the user property created by Passport`)
        console.log(user._doc)
        const packet: UserInterface = user._doc;
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
     * **summary**: set the user's JWT in the redis 'dead-list' to log the user out prior to the JWT expiration
     * @param user user property from the request object
     */
    logout = async(req: Request) => {
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
     * **summary**: change the logged in user's password
     * @param new_password
     * @param confirm_password
     * @param req
     */
    changePassword = async(data: ChangePasswordDto, req) => {
        try {
            // verify user submitted same pw twice
            await this.verifyNewPasswordUtil.checkTypos({ newPassword: data.newPassword, confirmPassword: data.confirmPassword });
            // extract the jwt and it's key (last 8 digits)
            const { jwt, key } = await this.extractKeyValueUtil.extract(req);
            // find user document
            const user = await this.userService.findUser({email: req.user.email});
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
     * summary: send an email to a valid user email address to request resetting their forgotten password
     * @param email the email for resetting the password
     * **summary**: sends user a reset password link to the provided email, if it's an account associated email
     */
    forgotPassword = async(data: ForgotPasswordDto) => {
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
     * **summary**: reset a user's password with the information submitted by a forgot-and-reset email
     * @param email the valid user email
     * @param newPassword the new password entered the 1st time
     * @param confirmPassword the identical new password entered a second time
     */
    resetPassword = async(data: ResetPasswordDto) => {
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
