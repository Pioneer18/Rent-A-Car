import { Injectable } from '@nestjs/common';
import { ValidateEmailUtilInterface } from '../interface/utils/validate-email-util.interface';
/**
 * **summary**: throw an error if the user email already exists
 * @param check the results of a find user by email query
 */
@Injectable()
export class ValidateEmailUtil {
    constructor() {}

    /**
     * **summary**: if the array has a length greater than 0, a user with the email already exists
     * @param check
     */
    validateEmail = (data: ValidateEmailUtilInterface): void => {
        if (data.check.length === 0 || data.check.length === undefined) { return; }
        throw new Error('A User exists that is already using this email');
    }
}
