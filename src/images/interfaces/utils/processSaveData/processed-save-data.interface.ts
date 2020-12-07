import { Image } from '../../image.interface';
/**
 * **summary**: Interface for the values returned by the ProcessSaveDataUtil.process() method
 */
export interface ProcessedSaveDataInterface {
    packet: Image[] | null;
    image: Image | null;
}
