import { Injectable } from "@nestjs/common";
import { FindUserByResetPwTokenInterface } from "../interface/service/find-user-by-reset-pw-token.interface";
/**
 * **summary**: Dto to find a user by the reset password token
 */
@Injectable()
export class FindUserByResetPwTokenDto implements FindUserByResetPwTokenInterface {
    token: string;
}