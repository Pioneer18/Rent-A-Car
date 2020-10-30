import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    /**
     * ENDPOINTS:
     * login, logout, forgot, reset, change
     */
    @Post('login')
	async login(@Body() loginUserDto: LoginUserDto){
		 //return await this.authService.validateUserByPassword(loginUserDto);
	
	}

	@Post('forgot')
	//send email for forgotten password reset
	async forgotPassword(@Body() forgotPassword: ForgotPasswordDto ){
		 //return await this.authService.forgotPasswordEmail(forgotPassword);
	}

	@Post('reset')
	//handle forgotten password reset request - change user's password
	async resetPassword(@Body() resetPassword: ResetPasswordDto){
		 //return await this.authService.resetPassword(resetPassword);
	}

	@Post('change')
	// @UseGuards(PermissionGuard)
	//allow a logged in user to change their password
	async changePassword(@Body() changePassword: ChangePasswordDto){
		 //return await this.authService.changePassword(changePassword);
    }
}