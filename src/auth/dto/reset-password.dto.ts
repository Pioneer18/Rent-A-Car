/**
 * **summary**: the data transer object for resetting a user password
 */
export class ResetPasswordDto {
	readonly resetPass: string;
	readonly confirmPass: string;
	readonly resetPasswordToken: string;
}