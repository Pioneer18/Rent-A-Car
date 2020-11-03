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

      // update this to also use email
    async findUser(data: FindUserDto) {
        try {
            console.log('here is the username ' + data.username)
            const name = data.username;
            const user = await this.userModel.find({username: name});
            console.log(`this is the user that was found: ${user}`);
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async createUser(user: CreateUserDto) {
        try {
            console.log('creating a user!!');
            const document = await new this.userModel(user);
            console.log(`this is the document: ${document}`);
            await document.save();
            return document;
        } catch (err) {
            throw new Error(err);
        }
    }
}
