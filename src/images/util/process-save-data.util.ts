import { Injectable } from "@nestjs/common";
import { ImageInterface } from "../interface/modelInterface/image.interface";
import { ProcessedSaveDataDto } from "../dto/processed-save-data.dto";
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
  process = async (files, user_id, rental_id, category): Promise<ProcessedSaveDataDto> => {
    if (files && files.length > 0) {
      // single file
      if (files.length === 1) {
        const temp = files[0];
        const image: ImageInterface = {
          user_id: user_id,
          rental_id: rental_id,
          bucket: temp.bucket,
          key: temp.key,
          etag: temp.etag,
          category: category,
          size: temp.size,
          location: temp.location
        }
       return {packet: null, image: image}

      }
      // multiple files
      const packet = files.map(item => {
        const image: ImageInterface = {
          user_id: user_id,
          rental_id: rental_id,
          bucket: item.bucket,
          key: item.key,
          etag: item.etag,
          category: category,
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