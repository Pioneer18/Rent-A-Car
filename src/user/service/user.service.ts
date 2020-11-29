import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../interface/modelInterface/user.interface';
import { Request } from 'express';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { VerifyNewPasswordUtil } from 'src/auth/util/verify-new-password.util';
import { RedisService } from '../../redis/service/redis.service';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { CreateUserInterface } from '../interface/service/create-user.interface';
import { CreatedUserInterface } from '../interface/service/created-user.interface'
import { FindUserInterface } from '../interface/service/find-user.interface';
import { FindUserByResetPwTokenInterface } from '../interface/service/find-user-by-reset-pw-token.interface';
import { UpdateUserInterface } from '../interface/service/update-user.interface';
import { DeleteUserInterface } from '../interface/service/delete-user.interface';
import { ReturnedUserInterface } from '../interface/service/returned-user.interface';
import { DeleteResponseInterface } from 'src/common/interfaces/delete-response.interface';
/**
 * **summary**: contains all of the functionality to manage a user profile
 */
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private readonly extractKeyValueUtil: ExtractKeyValueUtil,
        private readonly verifyNewPasswordUtil: VerifyNewPasswordUtil,
        private readonly redisService: RedisService,
    ) { }

    /**
     * **summary**: Create a new user
     * @param user New user data
     */
    createUser = async(user: CreateUserInterface) => {
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
     * **summary**: Find a user by email
     * @param data Email
     */
    findUser = async (data: FindUserInterface) => {
        try {
            const user = await this.userModel.findOne({ email: data.email });
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * **summary**: Find a user by their resetPasswordToken once they have submitted the reset password email
     * @param data The token
     */
    findUserByResetPasswordToken = async(data: FindUserByResetPwTokenInterface) => {
        try {
            const user = await this.userModel.findOne({ resetPasswordToken: data.token });
            return user;
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * **summary**: Update an existing user's information
     * @param data The update user data
     * @param req The client request
     */
    updateUser = async(data: UpdateUserInterface, req ) => {
        try {
            // extract user email
            const user: JwtPayloadInterface = req.user;
            const filter = {email: user.email };
            // create an update object
            let update = this.createUserUpdate(data);
            const updater = {
                $set: update,
            }
            // logout the user and return the data before redirecting to login
            await this.logoutUser(req);
            return await this.userModel.findOneAndUpdate(filter, updater, {new: true});
       } catch(err) {
           throw new Error(err)
       }
    }

    /**
     * **summary**: Delete a user's account
     * @param data user credentials
     * @param req The client request
     */
    deleteUser = async(data: DeleteUserInterface, req) => {
        try {
            // extract user email
            const doc:JwtPayloadInterface = req.user;
            // query the user
            const user = await this.findUser({email: doc.email});
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

    /**
     * **summary**: Create a MongoDB update object for updating a user profile
     * @param data Client request data to update a user
     */
    private createUserUpdate = (data: UpdateUserInterface): UpdateUserInterface => {
        let update: UpdateUserInterface = {}
        data.username ? update.username = data.username : data.username = null;
        data.email ? update.email = data.email : data.email = null;
        return update;
    }

    /**
     * **summary**: Log a user out of the application by adding their JWT to the Redis cache 'dead-list'
     * @param req The client request
     */
    private logoutUser = async(req: Request): Promise<void> => {
        const {jwt, key} = await this.extractKeyValueUtil.extract(req);
        await this.redisService.set(key, jwt);
    }

}
