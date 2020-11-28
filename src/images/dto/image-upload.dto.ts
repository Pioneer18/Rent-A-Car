/**
 * **summary**: Dto for uploading images to AWS
 */
export class ImageUploadDto {
    Bucket: string; // bucket name and folder
    Key: string; // file name
    Body: string; // buffer
}