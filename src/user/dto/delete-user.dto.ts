import { Injectable } from "@nestjs/common";
/**
 * **summary**: user password to confirm delteing their profile
 */
@Injectable()
export class DeleteUserDto {
    password: string;
}