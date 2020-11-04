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

  // incoming files will always be in an array
  // map the files and upload them to the database
  async saveVehicleImages (files: [any]) {
    try {
      const packet: ImageInterface[] = []; 
      // map the files and push to packet
      // grab the logged in user's id from the jwt (must decode it)
      files.map(item => {
        /**
         * for each item grab;
         * - buffer (img data)
         * - mimetype
         * - originalname
         * - encoding (e.g. 7bit)
         * - size
         * - userId (ref)
         */
        packet.push({
          data: item.buffer,
          mimeType: item.mimetype,
          originalName: item.originalname,
          encoding: item.encoding,
          size: item.size,
          user_id: 'fake_id_for_now23',
        })
      })
      // use insertMany to save the packet to the db
      const upload = await this.imagesModel.insertMany(packet);
      console.log(`packet was inserted`);
      return upload;
    } catch(err) {
      throw new Error(err);
    }
  }
}
