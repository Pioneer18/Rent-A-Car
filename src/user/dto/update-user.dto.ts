import { Injectable } from "@nestjs/common";
/**
 * **summary**: data for updating a user profile
 */
@Injectable()
export class UpdateUserDto {
    username?: string;
    email?: string;
}