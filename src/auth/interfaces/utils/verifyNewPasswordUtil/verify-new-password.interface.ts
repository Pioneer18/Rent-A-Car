/**
 * **summary**: Interface for the VerfiyNewPasswordUtil's verifyNew() and verifyMatch() methods
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class VerifyNewPasswordInterface {
    newPassword: string;
    oldPassword: string;
}
