/**
 * **summary**: the data transfer object for a decoded JWT
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export interface JwtPayloadInterface { 
    username: string;
    email: string; 
    userId: string;
}