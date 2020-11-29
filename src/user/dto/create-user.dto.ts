import { Injectable } from "@nestjs/common";
/**
 * **summary**: Dto for creating a new user
 */
@Injectable()
export class CreateUserDto {
    username: string;
    email: string;
    password: string;
}