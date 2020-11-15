import { Injectable } from "@nestjs/common";
import { VerifyNewPasswordDto } from "../dto/verify-new-password.dto";
import * as bcrypt from 'bcrypt';
import { CheckPasswordTypoDto } from "../dto/check-password-typo.dto";
/**
 * Password Verification functions
 */
@Injectable()
export class VerifyNewPasswordUtil {
    constructor(){}

    /**
     * Verify the new password does not match the database password
     * @param data 
     */
    async verifyNew(data: VerifyNewPasswordDto){
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (check) { throw new Error('Error: The new password cannot mathch the current password.') };
        return;
    }

    async asyncVerifyMatch(data: VerifyNewPasswordDto){
        const check = await bcrypt.compare(data.newPassword, data.oldPassword);
        if (!check) { throw new Error('Error: incorrect password entered')};
        return;
    }

    /**
     * Verify the user entered the same password twice
     * @param data 
     */
    checkTypos(data: CheckPasswordTypoDto) {
        const check = data.newPassword === data.confirmPassword;
        if (check) { return };
        throw new Error('You did not enter the same password twice, please try again')
    }
}