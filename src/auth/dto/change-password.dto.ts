import { ChangePasswordInterface } from "../interfaces/change-password.interface";

/**
 * **summary**: dto for the @post('change-password') endpoint. implements the ChangePasswordInterface for the
 * auth.service.changePassword() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ChangePasswordDto implements ChangePasswordInterface {
	readonly newPassword: string;
	readonly confirmPassword: string;
}
