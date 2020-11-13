import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { JwtPayloadInterface } from "src/auth/interface/jwt-payload";
import { AppConfigService } from "src/config/configuration.service";
/**
 * extract the email from a given jwt
 */
@Injectable()
export class ExtractEmailUtil {
    constructor(private readonly appConfig: AppConfigService) {}

    async extract(token: string) {
        // grab the secret
        const secret = this.appConfig.secret_key;
        const decoded = await jwt.verify(token, secret);
        console.log('here is the decoded JWT')
        console.log(decoded)
    }

}