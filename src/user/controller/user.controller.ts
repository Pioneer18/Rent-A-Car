import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
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
    async createProfile(@Body() user: CreateUserDto) {
        return await this.userService.createUser(user);
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
    async findUser(@Body() username: string) {
        return await this.userService.findUser(username)
    }

    @Post('delete-profile')
    async deleteProfile(@Body() data) {
        return 'tee-hee';
    }
}
