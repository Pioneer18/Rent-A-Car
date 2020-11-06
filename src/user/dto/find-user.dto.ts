import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserDto {
    email: string;
}