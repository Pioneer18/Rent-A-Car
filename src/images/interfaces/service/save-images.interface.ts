import { ImageFileInterface } from "../image-file.interface";
/**
 * **summary**: Interface for the image.service.saveImages method
 */
export interface SaveImagesInterface {
    files: ImageFileInterface[]; // define this later
    user_id: string;
    rental_id: string;
    category: string;
}