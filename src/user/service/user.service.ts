import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/user.interface';
import { FindUserDto } from '../dto/find-user.dto';
import { ResetPasswordTokenDto } from '../dto/find-user-by-reset-password-token.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Request } from 'express';
import { ExtractEmailUtil } from '../../common/util/extract-email.util';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { VerifyNewPasswordUtil } from 'src/auth/util/verify-new-password.util';
import { RedisService } from '../../redis/service/redis.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private readonly extractEmailUtil: ExtractEmailUtil,
        private readonly extractKeyValueUtil: ExtractKeyValueUtil,
        private readonly verifyNewPasswordUtil: VerifyNewPasswordUtil,
        private readonly redisService: RedisService
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
            console.log('Find-User Calling User Model...')
            const user = await this.userModel.findOne({ email: data.email });
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
            console.log('Finding User by resetPasswordToken');
            const user = await this.userModel.findOne({ resetPasswordToken: data.token });
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
            const filter = {email: await this.extractUserEmail(req)};
            // create an update object
            let update = this.createUserUpdate(data);
            const updater = {
                $set: update,
            }
            console.log('User Update Object');
            console.log(updater);
            // logout the user and return the data before redirecting to login
            await this.logoutUser(req);
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
            const email = await this.extractUserEmail(req);
            // query the user
            const user = await this.findUser({email: email});
            // verify their password matches the current
            await this.verifyNewPasswordUtil.verifyMatch({newPassword: data.password, oldPassword: user.password})
            // logout
            await this.logoutUser(req);
            // delete
            const res = await user.remove();
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
        return update;
    }

    // this could be a middleware
    private async extractUserEmail(req: Request):Promise<string> {
        const {jwt} = await this.extractKeyValueUtil.extract(req)
        const email = await this.extractEmailUtil.extract(jwt);
        return email;
    }

    private async logoutUser(req: Request){
        const {jwt, key} = await this.extractKeyValueUtil.extract(req);
        await this.redisService.set(key, jwt);
    }

}
