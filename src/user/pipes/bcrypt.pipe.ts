import { Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashPipe implements PipeTransform {

    /**
     * Use bcrypt to hash and salt the user's password
     * @param value new user info
     */
    async transform(value: CreateUserDto) {
        try {
            console.log(`I Love Unathi!`);
            const hash = await bcrypt.hash(value.password, 10);
            const verified = await bcrypt.compare(value.password, hash);
            if (verified) {
                console.log('verified :)')
                value.password = hash;
                return value;
            }
            throw new Error('Bcrypt hashing failed, hash did not match the original')
        } catch(err) {
            throw new Error(err);
        }
    }
}