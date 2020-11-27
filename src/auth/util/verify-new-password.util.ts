import { Injectable } from "@nestjs/common";
import { VerifyNewPasswordDto } from "../dto/verify-new-password.dto";
import * as bcrypt from 'bcrypt';
import { CheckPasswordTypoDto } from "../dto/check-password-typo.dto";
/**
 * **summary**: validate incoming new password data
 */
@Injectable()
export class VerifyNewPasswordUtil {

    /**
     * **summary**: verify the new password does not match the database password
     * @param data 
     */
    verifyNew = async(data: VerifyNewPasswordDto): Promise<void> => {
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (check) { throw new Error('Error: The new password cannot mathch the current password.') };
        return;
    }

    /**
     * **summary**: verify the entered password matches the password saved in the database for this user
     * @param data 
     */
    verifyMatch = async(data: VerifyNewPasswordDto): Promise<void> => {
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (!check) { throw new Error('Error: incorrect password entered')};
        return;
    }

    /**
     * **summary**: verify the user entered the same password twice
     * @param data 
     */
    checkTypos = (data: CheckPasswordTypoDto): Promise<void> => {
        const check = data.newPassword === data.confirmPassword;
        if (check) { return };
        throw new Error('You did not enter the same password twice, please try again')
    }
}