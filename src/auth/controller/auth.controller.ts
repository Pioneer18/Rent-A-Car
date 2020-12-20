import { Controller, HttpCode, Post, UseGuards, Request, Body, Req, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoggedOutGuard } from '../guards/logged-out.guard';
import { ExtractKeyValueUtilInterface } from '../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface';
import { AuthService } from '../service/auth.service';
/**
 * **summary**: Controller for handling the authentication and authorization of a registered user
 * - note: Some methods in this controller are protected by JwtAuthGuard and LoggedOutGuard, which verify a user is Authorized
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * **summary**: Authenticate and login a user
     * @param email The user's email
     * @param password The user's submitted password to be validated
     */
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response): Promise<Response> {
        const cookie = await this.authService.login(req.user._doc);
        res.setHeader('Set-Cookie', cookie);
        req.user._doc.password = undefined;
        return res.send(req.user._doc);
    }

    /**
     * **summary**: Logout a user by adding their JWT to a Redis 'dead-list' that will end the user's authorized
     * session prior to the JWT expiration time
     * @param req The request containing the user's JWT payload to be added to the logged-out 'dead-list' in the Redis cache
     */
    @UseGuards(JwtAuthGuard)
    // @Redirect('http://localhost:3000/auth/login')
    @Post('logout')
    async logout(@Request() req): Promise<ExtractKeyValueUtilInterface> {
        return await this.authService.logout(req);
    }

    /**
     * **summary**: Change the password of a logged in and authorized user
     * @param req The request with the user JWT payload
     * @param data The new password data
     */
    @UseGuards(LoggedOutGuard)
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Req() req, @Body() data: ChangePasswordDto): Promise<void> {
        return this.authService.changePassword(data, req);
    }

    /**
     * **summary**: Request to reset a forgotten password
     * @param data The email address to send the forgot-password email to
     */
    @Post('forgot-password')
    async forgotPassword(@Body() data: ForgotPasswordDto): Promise<string> {
        return this.authService.forgotPassword(data);
    }

    /**
     * **summary**: Resets the user's password with the data submitted from the email redirect
     * @param data The data submitted by the user to the reset-password email form
     */
    @Post('reset-password')
    async resetPassword(@Body() data: ResetPasswordDto): Promise<void> {
        return await this.authService.resetPassword(data);
    }
}
