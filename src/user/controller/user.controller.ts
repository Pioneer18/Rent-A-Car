import { Controller, Post, Body, Get } from '@nestjs/common';
import { FindUserDto } from '../dto/find-user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        // initialize stuffs
    }
    /**
     * ENDPOINTS:
     * create profile, update profile, upload profile image
     * login, logout, delete profile
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

    @Get('find-user')
    async findUser(@Body() user: FindUserDto) {
        return await this.userService.findUser(user)
    }

    @Post('delete-profile')
    async deleteProfile(@Body() data) {
        return 'tee-hee';
    }
}
