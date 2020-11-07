import { Injectable } from "@nestjs/common";

@Injectable()
export class ValidateEmailUtil {
    constructor() {}

    validateEmail(check){
        if(check.length === 0 || check.length === undefined) return
        throw new Error('A User exists that is already using this email');
    }
}