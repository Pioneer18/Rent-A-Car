import { ImageInterface } from "../modelInterface/image.interface";
/**
 * **summary**: Interface for the values returned by the ProcessSaveDataUtil.process() method
 */
export interface ProcessedSaveDataInterface {
    packet: ImageInterface[];
    image: ImageInterface;
}