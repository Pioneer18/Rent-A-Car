import { Controller, UseGuards, Get, Request} from '@nestjs/common';
import { AuthService } from './auth/service/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.gaurd';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return 'tee-hee';
  }
}
