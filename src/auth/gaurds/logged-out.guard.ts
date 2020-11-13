import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RedisService } from "src/redis/service/redis.service";

@Injectable()
export class LoggedOutGaurd implements CanActivate {
    constructor(private readonly redisService: RedisService) {}

    // This is where we use redis to check the incoming jwt by it's last 8 digits
    private async checkDeadList(req): Promise<boolean> {
        // grab the key from the incoming jwt
        const rawAuth = req.headers.authorization;
        const key = rawAuth.slice(-8);
        const check = await this.redisService.get(key);
        console.log(`LOGGED-OUT Guard Check Results: `);
        console.log(check)
        // if the key is found, deny access; User is Logged Out
        if (check && check !== null) {
            throw new Error('You are logged out, log back in to continue');
            // REDIRECT to login
        }
        return true;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('I LOVE UNATHI - LOGGED-OUT GUARD :)')
        return this.checkDeadList(request);
    }
}