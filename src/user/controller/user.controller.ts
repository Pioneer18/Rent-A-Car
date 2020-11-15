import { Controller, Post, Body, Get, UsePipes, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { LoggedOutGaurd } from '../../auth/gaurds/logged-out.guard';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
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
    // validate-email.middleware applied
    @Post('create-user')
    async createProfile(@Body() user: CreateUserDto) {
        return await this.userService.createUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-user')
    async updateProfile(@Body() update) {
        return 'tee-hee';
    }

    /*
     * See Images Controller for Upload User Image(s)
    */

    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Get('find-user')
    async findUser(@Body() user: FindUserDto) {
        return await this.userService.findUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete-profile')
    async deleteProfile(@Body() data) {
        return 'tee-hee';
    }
}
