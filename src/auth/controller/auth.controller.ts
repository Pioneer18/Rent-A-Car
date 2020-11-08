import { Controller, HttpCode, Post, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.gaurd";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { RequestWithUser } from "../interface/request-with-user.interface";
import { AuthService } from "../service/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  // bare-bones login route
  // Passport automatically creates a user object, based on the value we return
  // from the validate() method, and assigns it to the Request object as req.user.
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    // extract user object from request object
    // create a cookie
    // set the cookie in the header
    // return the accessToken-
    return this.authService.login(req.user);
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