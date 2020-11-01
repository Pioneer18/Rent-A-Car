import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from '../interface/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
      ) {}

    async findUser(username: string) {
        try {
            return this.userModel.find(user => user.username === username);
        } catch (err) {
            throw new Error(err);
        }
    }
}
