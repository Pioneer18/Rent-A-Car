import { Controller, Post, Body, Get, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { BcryptHashPipe } from '../pipes/bcrypt.pipe';
import { CreateUserValidation } from '../schema/validation/create-user-validation.schema';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        // initialize stuffs
    }
    
    @UsePipes(new BcryptHashPipe())
    @UsePipes(new JoiValidationPipe(CreateUserValidation))
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
    async findUser(@Body() user: FindUserDto) {
        return await this.userService.findUser(user)
    }

    @Post('delete-profile')
    async deleteProfile(@Body() data) {
        return 'tee-hee';
    }
}
