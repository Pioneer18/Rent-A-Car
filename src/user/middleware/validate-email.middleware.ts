import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express';
/**
 * Validate the requested email is unique to the database
 */
@Injectable()
export class ValidateEmailMiddleware implements NestMiddleware {
    constructor() {}

    async use(req: Request, res: Response, next: Function) {
        // apply to create-user route
        if (req.originalUrl === 'v1/user/create-user') {
            console.log('hello');
        }
        next();
    }
}