import { Controller, HttpCode, Post, UseGuards, Request, Body } from "@nestjs/common";
import { JwtAuthGuard } from "../gaurds/jwt-auth.gaurd";
import { LocalAuthGuard } from "../gaurds/local-auth.guard";
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
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /**
     * Logout
     * @param req
     */
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req) {
        return await this.authService.logout(req);
    }

    /**
     * Change Password
     */
    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Body() data) {
        return data;
    }

    /**
     * Forgot Password
     */
    @Post('forgot-password')
    async forgotPassword(@Body() data) {
        return data;
    }


}