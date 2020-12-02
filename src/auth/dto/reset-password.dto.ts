import { ResetPasswordInterface } from '../interfaces/service/reset-password.interface';

/**
 * **summary**: The data transer object for resetting a user password
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ResetPasswordDto implements ResetPasswordInterface {
	readonly resetPass: string;
	readonly confirmPass: string;
	readonly resetPasswordToken: string;
}
