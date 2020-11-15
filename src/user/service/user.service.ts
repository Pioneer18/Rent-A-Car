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

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
        private readonly extractEmailUtil: ExtractEmailUtil,
        private readonly extractKeyValueUtil: ExtractKeyValueUtil
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
            return await this.userModel.findOneAndUpdate(filter, updater, {new: true});
       } catch(err) {
           throw new Error(err)
       }
    }

    // private methods
    private createUserUpdate(data: UpdateUserDto) {
        let update: UpdateUserDto = {}
        data.username ? update.username = data.username : data.username = null;
        data.email ? update.email = data.email : data.email = null;
        return update;
    }

    private async extractUserEmail(req: Request) {
        const {jwt} = await this.extractKeyValueUtil.extract(req)
        const email = await this.extractEmailUtil.extract(jwt);
        return email;
    }

}
