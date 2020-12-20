import { Controller, Post, Body, Get, UsePipes, UseGuards, Req, Redirect } from '@nestjs/common';
import { CreateQuery } from 'mongoose';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { LoggedOutGuard } from '../../auth/gaurds/logged-out.guard';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModelInterface } from '../interface/modelInterface/user-model.interface';
import { BcryptHashPipe } from '../pipes/bcrypt.pipe';
import { CreateUserValidation } from '../schema/validation/create-user-validation.schema';
import { UserService } from '../service/user.service';
import { UserInterface } from '../interface/user.interface';
/**
 * **summary**: Controller for managing users in the application
 */
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * **summary**: Create a new user profile
     * @param user New user data
     */
    @UsePipes(new BcryptHashPipe())
    @UsePipes(new JoiValidationPipe(CreateUserValidation))
    @Post('create-user')
    async createProfile(@Body() user: CreateUserDto): Promise<UserInterface> {
        return await this.userService.createUser(user);
    }

    /**
     * **summary**: Update a user's profile data
     * @param update updates
     * @param req Client request
     */
    @UseGuards(JwtAuthGuard)
    // @UseGuards(LoggedOutGuard)
    @Post('update-user')
    // @Redirect('http://localhost:3000/auth/login')
    async updateProfile(@Body() update: UpdateUserDto, @Req() req): Promise<UserInterface> {
        return await this.userService.updateUser(update, req);
    }

    /**
     * summary: Find a user by email
     * @param email User's email
     */
    @UseGuards(JwtAuthGuard)
    // @UseGuards(LoggedOutGuard)
    @Get('find-user')
    async findUser(@Body() email: FindUserDto): Promise<UserModelInterface> {
        return await this.userService.findUser(email);
    }

    /**
     * **summary**: Delete a user profile
     * @param data User credentials
     */
    @UseGuards(JwtAuthGuard)
    // @UseGuards(LoggedOutGuard)
    // @Redirect('http://localhost:3000/auth/login', 302)
    @Post('delete-profile')
    async deleteProfile(@Body() data: DeleteUserDto, @Req() req): Promise<UserInterface> {
        return this.userService.deleteUser(data, req);
    }
}
