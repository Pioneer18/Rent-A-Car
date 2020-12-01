import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express';
import { userModel } from '../../common/Const';
import { UserInterface } from '../interface/modelInterface/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidateEmailUtil } from '../utils/validate-email.util';
/**
 * **summary**: before creating a new user, validate that their email is not already in the database. this middleware is only applied to the 
 * user.controller.createUser() method
 * - note: uses the ValidateEmailUtil class
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

    /**
     * **summary**: query the databse to valdiate the requested new email is unique to the database
     * @param value the requested new user email
     */
    private validateEmail = async(value: CreateUserDto) => {
        const check = await this.user.find({ email: value.email });
        this.validateEmailUtil.validateEmail({check})
    }

    /**
     * **summary**: use the validateEmail method to validate the requested new user email does not already exist before continuing to the handler
     * @param req the client request
     * @param res the response
     * @param next the next method to continue to the request handler
     */
    use = async(req: Request, res: Response, next: Function) => {
        // apply to create-user route
        if (req.originalUrl === '/v1/user/create-user') {
            await this.validateEmail(req.body);
        }
        next();
    }
}