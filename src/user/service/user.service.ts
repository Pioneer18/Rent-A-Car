import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async findUser(user) {
        return {password: 'tee-hee'};
    }
}
