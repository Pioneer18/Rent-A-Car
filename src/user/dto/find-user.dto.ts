import { Injectable } from '@nestjs/common';
/**
 * **summary**: find a user profile by email
 */
@Injectable()
export class FindUserDto {
    email: string;
}