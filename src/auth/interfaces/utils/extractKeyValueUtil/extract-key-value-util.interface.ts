/**
 * **summary**: The interface for the ExtractKeyValueUtil.extract() method. Contains the JWT and it's key (last 8 digits of the JWT used for logging out) 
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export interface ExtractKeyValueUtilInterface {
    jwt: string;
    key: string;
}