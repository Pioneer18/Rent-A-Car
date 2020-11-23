import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImageInterface } from "../interface/image.interface";
import { Model } from 'mongoose';
import { ProcessedSaveDataInterface } from "../interface/processed-save-data.interface";

@Injectable()
export class ProcessSaveDataUtil {

  /**
   * Process
   * Summary: create a new Image Document or an array of Image Documents to be saved
   * @param files the incoming file(s) to be saved
   * @param user_id the user id
   * @param rental_id the rental id
   * @param category the category of the image: rentals or photos
   */
  process = async (files, user_id, rental_id, category): Promise<ProcessedSaveDataInterface> => {
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