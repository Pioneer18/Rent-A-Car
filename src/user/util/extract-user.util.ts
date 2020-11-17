import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtPayloadInterface } from "../../auth/interface/jwt-payload";

@Injectable()
export class ExtractUserUtil {
    constructor() {}

    async extract(req: Request): Promise<JwtPayloadInterface> {
        const temp: any = req.user;
        const user: JwtPayloadInterface = {
            username: temp.username,
            email: temp.email,
            sub: temp.sub,
            iat: temp.iat,
            exp: temp.exp
        }
        return user;
    }
}