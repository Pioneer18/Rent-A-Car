import { Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
/**
 * **summary**: encrypt the user's password 
 */
@Injectable()
export class BcryptHashPipe implements PipeTransform {

    /**
     * **summary**: use bcrypt to hash and salt the user's password
     * @param value new user info
     */
    transform = async(value: CreateUserDto) => {
        try {
            const hash = await bcrypt.hash(value.password, 10);
            const verified = await bcrypt.compare(value.password, hash);
            if (verified) {
                value.password = hash;
                return value;
            }
            throw new Error('Bcrypt hashing failed, hash did not match the original')
        } catch(err) {
            throw new Error(err);
        }
    }
}