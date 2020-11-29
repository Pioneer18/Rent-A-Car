import { Injectable } from "@nestjs/common";
/**
 * **summary**: Dto to find a user by the reset password token
 */
@Injectable()
export class ResetPasswordTokenDto {
    token: string;
}