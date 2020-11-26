/**
 * **summary**: data transfer object for changing the password of a logged in user
 */
export class ChangePasswordDto {
	readonly newPassword: string;
	readonly confirmPassword: string;
}
