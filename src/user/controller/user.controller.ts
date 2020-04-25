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

    @Post('upload-profile-image')
    async uploadProfileImage(@Body() image) {
        return 'tee-hee';
    }

    @Post('login')
    async login(@Body() data) {
        return 'tee-hee';
    }

    @Post('logout')
    async logout(@Body() data) {
        return 'tee-hee';
    }

    @Post('delete-profile')
    async deleteProfile(@Body() data) {
        return 'tee-hee';
    }
}
