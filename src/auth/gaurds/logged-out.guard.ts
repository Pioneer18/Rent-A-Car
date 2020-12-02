import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RedisService } from '../../redis/service/redis.service';
/**
 * **summary**: Override the JWT expiration time and 'logout' a user by adding their JWT to a Redis cache 'dead-list'
 */
@Injectable()
export class LoggedOutGaurd implements CanActivate {
    constructor(private readonly redisService: RedisService) {}

    /**
     * **summary**: This is where we use redis to check the incoming jwt by it's last 8 digits. If the user's JWT is on the 'dead-list'
     * they are no longer authorized to make requests before logging in again
     * @param req The request object
     */
    private async checkDeadList(req: Request): Promise<boolean> {
        // grab the key from the incoming jwt
        const rawAuth = req.headers.cookie;
        console.log(rawAuth);
        const key = rawAuth.slice(-8);
        const check = await this.redisService.get(key);
        console.log(`LOGGED-OUT Guard Check Results: `);
        console.log(check);
        // if the key is found, deny access; User is Logged Out
        if (check && check !== null) {
            throw new Error('You are logged out, log back in to continue');
            // REDIRECT to login
        }
        console.log('You are logged in :)');
        return true;
    }

    /**
     * **summary**: Method that decides if the request will continue to the handler or be blocked
     * @param context the execution context
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.checkDeadList(request);
    }
}
