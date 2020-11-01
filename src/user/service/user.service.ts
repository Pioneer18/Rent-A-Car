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

      // update this to also use email
    async findUser(username: string) {
        try {
            console.log('here is the username ' + username)
            const user = await this.userModel.find({username: username});
            console.log(user);
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
}
