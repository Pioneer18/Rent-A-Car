import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/user.interface';
import { FindUserDto } from '../dto/find-user.dto';
import { ResetPasswordTokenDto } from '../dto/find-user-by-reset-password-token.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Request } from 'express';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { VerifyNewPasswordUtil } from 'src/auth/util/verify-new-password.util';
import { RedisService } from '../../redis/service/redis.service';
import { JwtPayloadInterface } from 'src/auth/interface/jwt-payload';
import { ExtractUserUtil } from '../util/extract-user.util';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private readonly extractKeyValueUtil: ExtractKeyValueUtil,
        private readonly verifyNewPasswordUtil: VerifyNewPasswordUtil,
        private readonly redisService: RedisService,
        private readonly extractUserUtil: ExtractUserUtil,
    ) { }

    /**
     * Create User
     * @param user 
     */
    async createUser(user: CreateUserDto) {
        try {
            const document = await new this.userModel(user);
            await document.save();
            document.password = undefined;
            console.log('CREATE USER: RETURN');
            console.log(document);
            return document;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Find User by email
     * @param data email
     */
    async findUser(data: FindUserDto) {
        try {
            const user = await this.userModel.findOne({ email: data.email });
            console.log('FIND USER: RETURN')
            console.log(user);
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Find User by resetPasswordToken
     * @param data the token
     */
    async findUserByResetPasswordToken(data: ResetPasswordTokenDto) {
        try {
            const user = await this.userModel.findOne({ resetPasswordToken: data.token });
            console.log('FIND USER BY RESET PASSWORD TOKEN: RETURN')
            console.log(user);
            return user;
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Update User
     */
    async updateUser(data: UpdateUserDto, req: Request ) {
        try {
            // extract user email
            const user: JwtPayloadInterface = await this.extractUserUtil.extract(req);
            const filter = {email: user.email };
            // create an update object
            let update = this.createUserUpdate(data);
            const updater = {
                $set: update,
            }
            // logout the user and return the data before redirecting to login
            await this.logoutUser(req);
            console.log('UPDATE USER: RETURN')
            console.log(await this.userModel.findOneAndUpdate(filter, updater, {new: true}));
            return await this.userModel.findOneAndUpdate(filter, updater, {new: true});
       } catch(err) {
           throw new Error(err)
       }
    }

    /**
     * Delete User Profile
     * @param data user credentials
     * @param req
     */
    async deleteUser(data: DeleteUserDto, req: Request) {
        try {
            // extract user email
            const doc = await this.extractUserUtil.extract(req);
            // query the user
            const user = await this.findUser({email: doc.email});
            // verify their password matches the current
            await this.verifyNewPasswordUtil.verifyMatch({newPassword: data.password, oldPassword: user.password})
            // logout
            await this.logoutUser(req);
            // delete
            const res = await user.remove();
            console.log('DELETE USER: RETURN')
            console.log(res);
            return res.deletedCount;
        } catch(err) {
            throw new Error(err);
        }
    }

    /**
     ************************ Private Functions ************************
    */

    private createUserUpdate(data: UpdateUserDto) {
        let update: UpdateUserDto = {}
        data.username ? update.username = data.username : data.username = null;
        data.email ? update.email = data.email : data.email = null;
        console.log('CREATE USER UPDATE: RETURN')
        console.log(update);
        return update;
    }

    private async logoutUser(req: Request){
        const {jwt, key} = await this.extractKeyValueUtil.extract(req);
        await this.redisService.set(key, jwt);
    }

}
