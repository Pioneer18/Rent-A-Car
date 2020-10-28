import { Controller, Post, Body, Get } from '@nestjs/common';

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
    @Post('create-user')
    async createProfile(@Body() profile) {
        return 'tee-hee';
    }

    @Post('update-user')
    async updateProfile(@Body() update) {
        return 'tee-hee';
    }

    @Post('upload-profile-image')
    async uploadProfileImage(@Body() image) {
        return 'tee-hee';
    }

    @Get('find-users')
    async findUser(@Body() user) {
        return 'tee-hee';
    }

    // below will go into the auth module
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
