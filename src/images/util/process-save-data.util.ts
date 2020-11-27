import { Injectable } from "@nestjs/common";
import { ImageInterface } from "../interface/modelInterface/image.interface";
import { ProcessedSaveDataInterface } from "../interface/processed-save-data.interface";
import { SaveImagesInterface } from "../interface/save-images.interface";
/**
 * **summary**: utility to process the save image request data before passing it to the handler
 */
@Injectable()
export class ProcessSaveDataUtil {

  /**
   * **summary**: create a new Image Document or an array of Image Documents to be saved
   * @param files the incoming file(s) to be saved
   * @param user_id the user id
   * @param rental_id the rental id
   * @param category the category of the image: rentals or photos
   */
  process = async (data: SaveImagesInterface): Promise<ProcessedSaveDataInterface> => {
    if (data.files && data.files.length > 0) {
      // single file
      if (data.files.length === 1) {
        const temp = data.files[0];
        const image: ImageInterface = {
          user_id: data.user_id,
          rental_id: data.rental_id,
          bucket: temp.bucket,
          key: temp.key,
          etag: temp.etag,
          category: data.category,
          size: temp.size,
          location: temp.location
        }
       return {packet: null, image: image}

      }
      // multiple files
      const packet = data.files.map(item => {
        const image: ImageInterface = {
          user_id: data.user_id,
          rental_id: data.rental_id,
          bucket: item.bucket,
          key: item.key,
          etag: item.etag,
          category: data.category,
          size: item.size,
          location: item.location
        }
        return image
      });
      return {packet: packet, image: null}
    }
    throw new Error('Failed to save: files were not found')
  }
}