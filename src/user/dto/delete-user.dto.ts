import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserDto {
    password: string;
}