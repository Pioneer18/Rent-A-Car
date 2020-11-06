import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class BcryptPipe implements PipeTransform {

    /**
     * Use bcrypt to hash and salt the user's password
     * @param value user login credentials
     */
    async transform(value: any) {
        try {
            console.log(value);
        } catch(err) {
            throw new Error(err);
        }
    }
    //
}