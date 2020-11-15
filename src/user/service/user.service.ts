import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/user.interface';
import { FindUserDto } from '../dto/find-user.dto';
import { ResetPasswordTokenDto } from '../dto/find-user-by-reset-password-token.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
      ) {}

    /**
     * Find User by email
     * @param data email
     */
    async findUser(data: FindUserDto) {
        try {
            console.log('Find-User Calling User Model...')
            const user = await this.userModel.findOne({email: data.email});
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
            const user = await this.userModel.findOne({resetPasswordToken: data.token});
            return user;
        } catch(err) {
            throw new Error(err)
        }
    }

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
}
