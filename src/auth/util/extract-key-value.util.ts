import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ExtractKeyValueUtilInterface } from "../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface";
/**
 * summary: Grab the Authorization header Cookie and the extract JWT and the **key** used for caching the token
 * - note: the key is simply the last 8 digits of the this sessions JWT
 */
@Injectable()
export class ExtractKeyValueUtil {
    constructor() {}
    
    public extract = async(req: Request): Promise<ExtractKeyValueUtilInterface> => {
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