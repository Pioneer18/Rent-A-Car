/**
 * Save Images
 */
import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/image.interface';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
  ) {}

 /**
  * Upload Images of User's Vehicle
  * @param files user's selected vehicle image files
  */
  async saveVehicleImages (files: [any], user: any) {
    try {
      console.log('here is the incoming user payload')
      console.log(user);
      const packet: ImageInterface[] = []; 
      // map the files to image.interface and push to the packet
      files.map(item => {
        packet.push({
          data: item.buffer,
          mimeType: item.mimetype,
          originalName: item.originalname,
          encoding: item.encoding,
          size: item.size,
          category: 'Vehicle',
          user_id: 'fake_id_for_now23',
        })
      })
      // use insertMany to save the packet to the db
      const upload = await this.imagesModel.insertMany(packet);
      console.log(`packet was inserted`);
      return `Unathi is such a hottie! :)`;
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Upload Profile Image
   */
}
