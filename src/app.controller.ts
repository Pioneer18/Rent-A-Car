import { Controller, UseGuards, Get, Request} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggedOutGuard } from './auth/guards/logged-out.guard';
/**
 * **summary**: Does not provide any real functionality for the app
 */
@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  // @UseGuards(LoggedOutGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
