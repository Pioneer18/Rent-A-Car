import { Injectable } from "@nestjs/common";
/**
 * **summary**: Dto for logging into the application
 */
@Injectable()
export class LoginDto {
    username: string;
    password: string;
}