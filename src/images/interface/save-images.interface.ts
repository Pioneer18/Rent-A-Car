import { ImageFileInterface } from "./image-file.interface";

export interface SaveImagesInterface {
    files: ImageFileInterface[]; // define this later
    user_id: string;
    rental_id: string;
    category: string;
}