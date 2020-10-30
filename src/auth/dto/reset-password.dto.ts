/* Data Transfer Object (check Serializers in other languages) for resetPassword method */
export class ResetPasswordDto {
	readonly resetPass: string;
	readonly confirmPass: string;
	readonly resetPasswordToken: string; //should be in request body?
}