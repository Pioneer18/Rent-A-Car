import { Controller, UseGuards, Get, Post, Request, Req, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from './auth/gaurds/jwt-auth.guard';
import { LoggedOutGaurd } from './auth/gaurds/logged-out.guard';

@Controller()
export class AppController {
  // constructor() {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(LoggedOutGaurd)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
