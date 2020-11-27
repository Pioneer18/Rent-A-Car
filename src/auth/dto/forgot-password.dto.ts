import { ForgotPasswordInterface } from "../interfaces/forgot-password.interface";

/**
 * **summary**: Data tranfer object for requesting to reset a forgotten passowrd. A reset passoword email is sent to only valid email addresses
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ForgotPasswordDto implements ForgotPasswordInterface {
	email: string;
}