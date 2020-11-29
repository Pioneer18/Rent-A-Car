import { Injectable } from "@nestjs/common";
import { CreateUserInterface } from "../interface/service/create-user.interface";
/**
 * **summary**: Dto for creating a new user
 */
@Injectable()
export class CreateUserDto implements CreateUserInterface {
    username: string;
    email: string;
    password: string;
}