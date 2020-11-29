import { Injectable } from '@nestjs/common';
import { FindUserInterface } from '../interface/service/find-user.interface';
/**
 * **summary**: Dto to find a user profile by email
 */
@Injectable()
export class FindUserDto implements FindUserInterface {
    email: string;
}