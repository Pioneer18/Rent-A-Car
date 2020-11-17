import { Controller, Post, Body, Get, UsePipes, UseGuards, Req, Redirect } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { LoggedOutGaurd } from '../../auth/gaurds/logged-out.guard';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BcryptHashPipe } from '../pipes/bcrypt.pipe';
import { CreateUserValidation } from '../schema/validation/create-user-validation.schema';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    /**
     * Create User
     * @param user new user
     */
    @UsePipes(new BcryptHashPipe())
    @UsePipes(new JoiValidationPipe(CreateUserValidation))
    @Post('create-user')
    async createProfile(@Body() user: CreateUserDto) {
        return await this.userService.createUser(user);
    }

    /**
     * Update User
     * @param update updates
     * @param req 
     */
    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Post('update-user')
    @Redirect('http://localhost:3000/auth/login')
    async updateProfile(@Body() update: UpdateUserDto, @Req() req: Request) {
        return await this.userService.updateUser(update, req);
    }

    /*
     * See Images Controller for Upload User Image(s)
    */

    /**
     * Find User by Email
     * @param user 
     */
    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Get('find-user')
    async findUser(@Body() user: FindUserDto) {
        return await this.userService.findUser(user)
    }


    /**
     * Delete User Profile
     * @param data user credentials
     */
    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Redirect('http://localhost:3000/auth/login', 302)
    @Post('delete-profile')
    async deleteProfile(@Body() data: DeleteUserDto, @Req() req: Request) {
        return this.userService.deleteUser(data, req);
    }
}
