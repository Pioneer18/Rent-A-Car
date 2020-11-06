import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginDto {
    username: string;
    password: string;
}