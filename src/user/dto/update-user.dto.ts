import { Injectable } from "@nestjs/common";
/**
 * **summary**: Dto for updating a user profile
 */
@Injectable()
export class UpdateUserDto {
    username?: string;
    email?: string;
}