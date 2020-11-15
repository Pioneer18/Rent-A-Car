import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateUserDto {
    username: string;
    email: string;
}