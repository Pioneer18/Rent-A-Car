import { Injectable } from '@nestjs/common';
import { UpdateUserInterface } from '../interface/service/update-user.interface';
/**
 * **summary**: Dto for updating a user profile
 */
@Injectable()
export class UpdateUserDto implements UpdateUserInterface {
    username?: string;
    email?: string;
}
