import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // bare-bones login route
  // Passport automatically creates a user object, based on the value we return
  // from the validate() method, and assigns it to the Request object as req.user.
  // will replace this later to return a JWT instead
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
