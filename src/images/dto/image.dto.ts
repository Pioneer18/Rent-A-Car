/**
 * **summary**: Dto for identifying an image to take an action on
 *  - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ImageDto {
    _id: string; // id of an Image
    location?: string;
}
