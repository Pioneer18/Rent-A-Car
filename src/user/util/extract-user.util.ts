import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtPayloadDto } from "../../auth/dto/jwt-payload";

@Injectable()
export class ExtractUserUtil {
    constructor() {}

    async extract(req: Request): Promise<JwtPayloadDto> {
        const temp: any = req.user;
        const user: JwtPayloadDto = {
            username: temp.username,
            email: temp.email,
            userId: temp.userId
        }
        return user;
    }
}