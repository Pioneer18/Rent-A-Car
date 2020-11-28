import { ImageInterface } from "../modelInterface/image.interface";
/**
 * **summary**: Interface for the response object of the images.Service.findRentalImages() and .findProfileImages() methods
 */
export interface RetrievedImagesInterface {
    count: number;
    images: ImageInterface[]
}