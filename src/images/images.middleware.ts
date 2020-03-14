import { NestMiddleware, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ImagesMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: Function) {
        Logger.log(`here is the request`);
        Logger.log(req.body);
        next();
    }
}
