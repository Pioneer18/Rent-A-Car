/*change password dto */
export class ChangePasswordDto {
	readonly changePass: string;
	readonly confirmPass: string;
	readonly authorizedUser: string;
}
