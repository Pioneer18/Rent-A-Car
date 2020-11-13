import { Controller, UseGuards, Get, Post, Request, Req, HttpCode } from '@nestjs/common';
import { JwtAuthGuard } from './auth/gaurds/jwt-auth.gaurd';

@Controller()
export class AppController {
  // constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
