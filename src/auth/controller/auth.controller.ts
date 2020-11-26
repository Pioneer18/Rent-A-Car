import { Controller, HttpCode, Post, UseGuards, Request, Body, Req, Redirect, Res } from "@nestjs/common";
import { Response } from "express";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { JwtAuthGuard } from "../gaurds/jwt-auth.guard";
import { LocalAuthGuard } from "../gaurds/local-auth.guard";
import { LoggedOutGaurd } from "../gaurds/logged-out.guard";
import { AuthService } from "../service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Login
     * @param email
     * @param password 
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
     * Logout
     * @param req
     */
    @UseGuards(JwtAuthGuard)
    @Redirect('http://localhost:3000/auth/login')
    @Post('logout')
    async logout(@Request() req) {
        return await this.authService.logout(req);
    }

    /**
     * Change Password
     */
    @UseGuards(JwtAuthGuard)
    @UseGuards(LoggedOutGaurd)
    @Post('change-password')
    async changePassword(@Req() req,@Body() data: ChangePasswordDto) {
        return this.authService.changePassword(data, req)
    }

    /**
     * Forgot Password
     */
    @Post('forgot-password')
    async forgotPassword(@Body() data: ForgotPasswordDto) {
        return this.authService.forgotPassword(data)
    }

    /**
     * Reset Password
     * **summary**: resets the user's password with the data submitted from the email redirect
     */
    @Post('reset-password')
    async resetPassword(@Body() data: ResetPasswordDto) {
        return await this.authService.resetPassword(data)
    }
}