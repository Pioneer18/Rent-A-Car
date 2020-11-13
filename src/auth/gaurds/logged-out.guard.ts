import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RedisService } from "src/redis/service/redis.service";

@Injectable()
export class LoggedOutGaurd implements CanActivate {
    constructor(private readonly redisService: RedisService) {}

    // This is where we use redis to check the incoming jwt by it's last 8 digits
    private tee_hee(req): boolean {
        // grab the key from the incoming jwt
        const rawAuth = req.headers.authorization;
        const key = rawAuth.slice(-8);
        const check = this.redisService.get(key);
        console.log(`LOGGED-OUT Guard Check Results: `);
        console.log(check)
        return true;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('I LOVE UNATHI - LOGGED-OUT GUARD :)')
        return  this.tee_hee(request);
    }
}