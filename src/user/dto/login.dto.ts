import { Injectable } from "@nestjs/common";
/**
 * **summary**: user credentials for logging into the application
 */
@Injectable()
export class LoginDto {
    username: string;
    password: string;
}