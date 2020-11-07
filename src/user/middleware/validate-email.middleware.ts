import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express';
import { userModel } from '../../common/Const';
import { UserInterface } from '../interface/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateEmailUtil } from '../util/validate-email.util';
/**
 * Validate the requested email is unique to the database
 */
@Injectable()
export class ValidateEmailMiddleware implements NestMiddleware {

    validateEmailUtil: ValidateEmailUtil;
    constructor(
        @Inject(userModel)
        private readonly user: Model<UserInterface>,
    ) {
        this.validateEmailUtil = new ValidateEmailUtil()
    }

    private async validateEmail(value: CreateUserDto){
        const check = await this.user.find({email: value.email});
        this.validateEmailUtil.validateEmail(check)
    }

    async use(req: Request, res: Response, next: Function) {
        // apply to create-user route
        if (req.originalUrl === '/v1/user/create-user') {
            await this.validateEmail(req.body);
        }
        next();
    }
}