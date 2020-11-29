import { Injectable } from "@nestjs/common";
/**
 * **summary**: Dto to confirm delteing a user's profile
 */
@Injectable()
export class DeleteUserDto {
    password: string;
}