import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ExtractKeyValueUtilInterface } from "../interface/extract-key-value-util.interface";
/**
 * Grab the JWT from the Authorization header (should be cookie)
 * Extract the key and the JWT
 */
@Injectable()
export class ExtractKeyValueUtil {
    constructor() {}
    
    public async extract(req: Request): Promise<ExtractKeyValueUtilInterface> {
        if (req){
            const rawAuth: string = req.headers.cookie
            return {
                jwt: await rawAuth.slice(15), // JWT
                key: await rawAuth.slice(-8), // KEY
            }
        }
        throw new Error('Cannot extract JWT and KEY from missing Request Object');
    }

}