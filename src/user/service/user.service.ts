import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserInterface } from '../interface/user.interface';
import { FindUserDto } from '../dto/find-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
      ) {}

    async findUser(data: FindUserDto) {
        try {
            const email = data.email;
            const user = await this.userModel.find(email);
            return user;
        } catch (err) {
            throw new Error(err);
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
