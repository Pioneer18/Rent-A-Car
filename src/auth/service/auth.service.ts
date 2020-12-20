import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from '../../user/dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../user/interface/user.interface';
import { Request } from 'express';
import { RedisService } from '../../redis/service/redis.service';
import { ExtractKeyValueUtil } from '../util/extract-key-value.util';
import { VerifyNewPasswordUtil } from '../util/verify-new-password.util';
import { EmailService } from '../../email/email.service';
import { AppConfigService } from '../../config/configuration.service';
import { ValidateUserInterface } from '../interfaces/service/validate-user.interface';
import { ChangePasswordInterface } from '../interfaces/service/change-password.interface';
import { ForgotPasswordInterface } from '../interfaces/service/forgot-password.interface';
import { ResetPasswordInterface } from '../interfaces/service/reset-password.interface';
import { ExtractKeyValueUtilInterface } from '../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface';
import { ValidateUserReturn } from '../interfaces/service/validate-user-return.interface';

/**
 * **summary**: Provides the functionality to authenticate and authorize a user
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
     * **summary**:  Find the user in the database and authenticate their access to the application by verifying the present user credentials in the database
     * - note: Depends on the userService.findUser() and verifyNewPasswordUtil.verifyMatch() methods
     * @param email The user email
     * @param pass The user password
     */
    validateUser = async (data: ValidateUserInterface): Promise<ValidateUserReturn> => {
        try {
            const query: FindUserDto = { email: data.email };
            const user: UserInterface = await this.userService.findUser(query); // find user in db by username
            // validate the given password
            await this.verifyNewPasswordUtil.verifyMatch({newPassword: data.pass, oldPassword: user.password});
            const { password, ...result } = user;
            return result;
        } catch (err) {
            throw new Error(err);
            // catch and report the unique email error
        }
    }

    /**
     * summary: Return a JWT inside of a Cookie, which may only be interacted with by Http and not Javascript, to the now authenticated user
     * @param user The user logging into the application
     */
    login = async (user: UserInterface): Promise<string> => {
        // create the JWT payload
        const payload = {
            username: user.username,
            email: user.email,
            sub: user._id,
        };
        // create JWT and return as a Cookie string
        const token = await this.jwtService.sign(payload);
        return `Authentication=${token}; Secure; HttpOnly; Path=/; Max-Age=${this.appConfig.jwt_exp_time}`;
    }

    /**
     * **summary**: Set the user's JWT in the redis 'dead-list' to log the user out prior to the JWT expiration
     * @param user User property from the request object
     */
    logout = async (req: Request): Promise<ExtractKeyValueUtilInterface> => {
        try {
            // extract the jwt and the cachce key, then save the jwt to redis dead-list with the key
            const { key, jwt } = await this.extractKeyValueUtil.extract(req);
            await this.redisService.set(key, jwt);
            return { key, jwt };
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * **summary**: Change the logged in user's password
     * @param new_password
     * @param confirm_password
     * @param req
     */
    changePassword = async (data: ChangePasswordInterface, req): Promise<void> => {
        try {
            // verify user submitted same pw twice, extract the jwt and it's key (last 8 digits)
            await this.verifyNewPasswordUtil.checkTypos({ newPassword: data.newPassword, confirmPassword: data.confirmPassword });
            const { jwt, key } = await this.extractKeyValueUtil.extract(req);
            const user = await this.userService.findUser({email: req.user.email});
            // verify new password does not match current password & update the password
            await this.verifyNewPasswordUtil.verifyNew({ newPassword: data.newPassword, oldPassword: user.password });
            user.password = await bcrypt.hash(data.newPassword, 10);
            user.save();
            // logout the user, they'll need to log back in
            await this.redisService.set(key, jwt);
            return;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * summary: Send an email to a valid user email address to request resetting their forgotten password
     * @param email The email for resetting the password
     * **summary**: Sends user a reset password link to the provided email, if it's an account associated email
     */
    forgotPassword = async (data: ForgotPasswordInterface): Promise<string> => {
        try {
            // query user and confirm they exist
            const user = await this.userService.findUser({email: data.email});
            if (!user) { throw new Error('There is no User registered with the provided email'); }
            // set the reset-token and it's expiration on the user document
            user.setResetToken();
            user.setExpirationDate();
            user.save();
            // create mail options
            const mailOptions = await this.emailService.createMailOptions({email: user.email});
            await this.emailService.sendMail(mailOptions);
            return user.resetPasswordToken;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * **summary**: Reset a user's password with the information submitted by a forgot-and-reset email
     * @param email The valid user email
     * @param newPassword The new password entered the 1st time
     * @param confirmPassword The identical new password entered a second time
     */
    resetPassword = async (data: ResetPasswordInterface): Promise<void> => {
        // check new password for typos, verify resetPasswordToken is active, and verify the new password does not match current
        await this.verifyNewPasswordUtil.checkTypos({newPassword: data.confirmPass, confirmPassword: data.resetPass});
        const user = await this.userService.findUserByResetPasswordToken({token: data.resetPasswordToken});
        if (new Date >= user.resetPasswordExpires) { throw new Error('This passowrd reset request has expired, please make a new request.'); }
        await this.verifyNewPasswordUtil.verifyNew({newPassword: data.resetPass, oldPassword: user.password});
        // reset the password and the 'reset tokens' to null
        user.password = await bcrypt.hash(data.resetPass, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        // redirect to login
        return;
    }

}
