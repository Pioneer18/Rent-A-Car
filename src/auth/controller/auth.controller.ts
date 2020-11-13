import { Controller, HttpCode, Post, UseGuards, Request } from "@nestjs/common";
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
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /**
     * Logout
     * @param req
     */
    @UseGuards(JwtAuthGuard)
    @Post('auth/logout')
    async logout(@Request() req) {
        console.log(req.user);
        // expire the user's token
    }
}