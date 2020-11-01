import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindUserDto } from '../dto/find-user.dto';
import { UserInterface } from '../interface/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserInterface>,
      ) {}

    async findUser(username: FindUserDto) {
        try {
            return this.userModel.find(user => user.username === username);
        } catch (err) {
            throw new Error(err);
        }
    }
}
