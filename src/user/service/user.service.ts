import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/modelInterface/user.interface';
import { FindUserDto } from '../dto/find-user.dto';
import { ResetPasswordTokenDto } from '../dto/find-user-by-reset-password-token.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Request } from 'express';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { VerifyNewPasswordUtil } from 'src/auth/util/verify-new-password.util';
import { RedisService } from '../../redis/service/redis.service';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
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
     * **summary**: create a new user
     * @param user 
     */
    createUser = async(user: CreateUserDto) => {
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
     * **summary**: find a user by email
     * @param data email
     */
    findUser = async (data: FindUserDto) => {
        try {
            const user = await this.userModel.findOne({ email: data.email });
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * **summary**: find a user by their resetPasswordToken once they have submitted the reset password email
     * @param data the token
     */
    findUserByResetPasswordToken = async(data: ResetPasswordTokenDto) => {
        try {
            const user = await this.userModel.findOne({ resetPasswordToken: data.token });
            return user;
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * **summary**: update an existing user's information
     * @param data the update user data
     * @param req the client request
     */
    updateUser = async(data: UpdateUserDto, req ) => {
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
            console.log('UPDATE USER: RETURN')
            console.log(await this.userModel.findOneAndUpdate(filter, updater, {new: true}));
            return await this.userModel.findOneAndUpdate(filter, updater, {new: true});
       } catch(err) {
           throw new Error(err)
       }
    }

    /**
     * **summary**: delete a user's account
     * @param data user credentials
     * @param req the client request
     */
    deleteUser = async(data: DeleteUserDto, req) => {
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

    /**
     * **summary**: create a MongoDB update object for updating a user profile
     * @param data raw request data to update a user
     */
    private createUserUpdate = (data: UpdateUserDto) => {
        let update: UpdateUserDto = {}
        data.username ? update.username = data.username : data.username = null;
        data.email ? update.email = data.email : data.email = null;
        console.log('CREATE USER UPDATE: RETURN')
        console.log(update);
        return update;
    }

    /**
     * **summary**: log a user out of the application by adding their JWT to the Redis cache 'dead-list'
     * @param req the client request
     */
    private logoutUser = async(req: Request) => {
        const {jwt, key} = await this.extractKeyValueUtil.extract(req);
        await this.redisService.set(key, jwt);
    }

}
