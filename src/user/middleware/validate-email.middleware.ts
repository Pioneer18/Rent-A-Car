import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express';
import { userModel } from '../../common/Const';
import { UserInterface } from '../interface/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
/**
 * Validate the requested email is unique to the database
 */
@Injectable()
export class ValidateEmailMiddleware implements NestMiddleware {
    constructor(
        @Inject(userModel)
        private readonly user: Model<UserInterface>,
    ) {}

    private async validateEmail(value: CreateUserDto){
        const check = await this.user.find({email: 'nothing'});
        console.log('The email check');
        console.log(check);
    }

    async use(req: Request, res: Response, next: Function) {
        // apply to create-user route
        if (req.originalUrl === 'v1/user/create-user') {
            await this.validateEmail(req.body);
        }
        next();
    }
}