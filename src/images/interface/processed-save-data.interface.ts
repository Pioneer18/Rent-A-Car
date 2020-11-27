import { ImageInterface } from "./modelInterface/image.interface";
/**
 * **summary**: the dto for image data to be passed to the images.service.saveImages() method
 */
export interface ProcessedSaveDataInterface {
    packet: ImageInterface[];
    image: ImageInterface;
}