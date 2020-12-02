/**
 * **summary**: Dto for uploading images to AWS
 *  - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ImageUploadDto {
    Bucket: string; // bucket name and folder
    Key: string; // file name
    Body: string; // buffer
}
