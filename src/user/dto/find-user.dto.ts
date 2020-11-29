import { Injectable } from '@nestjs/common';
/**
 * **summary**: Dto to find a user profile by email
 */
@Injectable()
export class FindUserDto {
    email: string;
}