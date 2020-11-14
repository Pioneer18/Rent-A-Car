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
        console.log('Verifying and Decoding the JWT:')
        const decoded: any = await jwt.verify(token, secret);
        console.log('here is the user`s email')
        console.log(decoded.email)
        return decoded.email;
    }

}