import { Controller, HttpCode, Post, UseGuards, Request, Res } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "../guards/jwt-auth.gaurd";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { RequestWithUser } from "../interface/request-with-user.interface";
import { AuthService } from "../service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  /**
   * Login
   * @param req 
   * @param res
   * Validate User by email
   * Store JWT as Cookie in Response Header 
   * return user object
   */
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser, @Res() res: Response) {
    return await this.authService.login(req.user, res);
  }

  /**
   * Logout
   * @param req
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    console.log(req.user);
    // expire the user's token
  }
}