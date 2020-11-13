import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggedOutGaurd implements CanActivate {

    // This is where we use redis to check the incoming jwt by it's last 8 digits
    private tee_hee(): boolean {
        return true;
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('I LOVE UNATHI - LOGGED-OUT GUARD :)')
        return  this.tee_hee();
    }
}