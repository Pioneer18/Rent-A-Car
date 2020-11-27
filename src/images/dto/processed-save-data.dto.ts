import { ImageInterface } from "../interface/modelInterface/image.interface";
/**
 * **summary**: the dto for image data to be passed to the images.service.saveImages() method
 */
export class ProcessedSaveDataDto {
    packet: ImageInterface[];
    image: ImageInterface;
}