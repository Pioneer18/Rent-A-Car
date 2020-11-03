import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserDto {
    username: string;
}