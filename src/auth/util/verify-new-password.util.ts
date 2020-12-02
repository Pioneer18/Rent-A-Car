import { Injectable } from '@nestjs/common';
import { VerifyNewPasswordInterface } from '../interfaces/utils/verifyNewPasswordUtil/verify-new-password.interface';
import * as bcrypt from 'bcrypt';
import { CheckPasswordTypoInterface } from '../interfaces/utils/verifyNewPasswordUtil/check-password-typo.interface';
/**
 * **summary**: Validate incoming new password data
 */
@Injectable()
export class VerifyNewPasswordUtil {

    /**
     * **summary**: Verify the new password does not match the database password
     * @param data the new passowrd data
     */
    verifyNew = async (data: VerifyNewPasswordInterface): Promise<void> => {
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (check) { throw new Error('Error: The new password cannot mathch the current password.'); }
        return;
    }

    /**
     * **summary**: Verify the entered password matches the password saved in the database for this user
     * @param data the new password data
     */
    verifyMatch = async (data: VerifyNewPasswordInterface): Promise<void> => {
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (!check) { throw new Error('Error: incorrect password entered');}
        return;
    }

    /**
     * **summary**: Verify the user entered the same password twice
     * @param data new password data
     */
    checkTypos = (data: CheckPasswordTypoInterface): Promise<void> => {
        const check = data.newPassword === data.confirmPassword;
        if (check) { return; }
        throw new Error('You did not enter the same password twice, please try again');
    }
}
