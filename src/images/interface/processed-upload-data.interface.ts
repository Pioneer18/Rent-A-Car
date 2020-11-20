import { ImageUploadInterface } from "./image-upload.interface";

export interface ProcessedUploadDataInterface {
    param: ImageUploadInterface | null;
    packet: ImageUploadInterface[] | null;
}