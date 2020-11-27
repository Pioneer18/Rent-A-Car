import { Injectable } from "@nestjs/common";
/**
 * **summary**: find a user by the reset password token
 */
@Injectable()
export class ResetPasswordTokenDto {
    token: string;
}