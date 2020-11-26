import { Controller, UseGuards, Get, Post, Request, Req, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from './auth/gaurds/jwt-auth.guard';
import { LoggedOutGaurd } from './auth/gaurds/logged-out.guard';
/**
 * **summary**: does not provide any realy functionality for the app
 */
@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @UseGuards(LoggedOutGaurd)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
