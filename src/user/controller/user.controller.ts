import { Controller, Post, Body } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor() {
        // initialize stuffs
    }
    /**
     * create profile
     * update profile
     * upload profile image
     * login
     * logout
     * delete profile
     */
    @Post('create-profile')
    async createProfile(@Body() profile) {
        return 'tee-hee';
    }

    @Post('update-profile')
    async updateProfile(@Body() update) {
        return 'tee-hee';
    }

}
