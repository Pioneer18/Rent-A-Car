import { Controller, UseGuards, Get, Post, Request, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // bare-bones login route
  // Passport automatically creates a user object, based on the value we return
  // from the validate() method, and assigns it to the Request object as req.user.
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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
