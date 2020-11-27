import { Controller, HttpCode, Post, UseGuards, Request, Body, Req, Redirect, Res } from "@nestjs/common";
import { Response } from "express";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { JwtAuthGuard } from "../gaurds/jwt-auth.guard";
import { LocalAuthGuard } from "../gaurds/local-auth.guard";
import { LoggedOutGaurd } from "../gaurds/logged-out.guard";
import { AuthService } from "../service/auth.service";
/**
 * **summary**: controller for handling the authentication and authorization of a registered user
 * - note: some methods in this controller are protected by JwtAuthGuard and LoggedOutGuard, which verify a user is Authorized
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * **summary**: authenticate and login a user
     * @param email the user's email
     * @param password the user's submitted password to be validated
     */
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const cookie = await this.authService.login(req.user);
        res.setHeader('Set-Cookie', cookie);
        req.user._doc.password = undefined;
        return res.send(req.user._doc);
    }

    /**
     * **summary**: logout a user by adding their JWT to a Redis 'dead-list' that will end the user's authorized session prior to the JWT expiration time
     * @param req the request containing the user's JWT payload to be added to the logged-out 'dead-list' in the Redis cache
     */
    @UseGuards(JwtAuthGuard)
    @Redirect('http://localhost:3000/auth/login')
    @Post('logout')
    async logout(@Request() req) {
        return await this.authService.logout(req);
    }

    /**
     * **summary**: change the password of a logged in and authorized user
     * @param req the request with the user JWT payload
     * @param data the new password data
     */
    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Post('change-password')
    async changePassword(@Req() req, @Body() data: ChangePasswordDto) {
        return this.authService.changePassword(data, req)
    }

    /**
     * **summary**: request to reset a forgotten password
     * @param data the email address to send the forgot-password email to
     */
    @Post('forgot-password')
    async forgotPassword(@Body() data: ForgotPasswordDto) {
        return this.authService.forgotPassword(data)
    }

    /**
     * **summary**: resets the user's password with the data submitted from the email redirect
     * @param data the data submitted by the user to the reset-password email form
     */
    @Post('reset-password')
    async resetPassword(@Body() data: ResetPasswordDto) {
        return await this.authService.resetPassword(data)
    }
}