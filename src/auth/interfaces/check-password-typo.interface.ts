/**
 * **summary**: Interface for the VerifyNewPasswordUtil.checkTypos() method 
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export interface CheckPasswordTypoInterface {
    newPassword: string;
    confirmPassword: string;
}