/**
 * Save Images
 * Could upload images to AWS S3 bucket and save the links?
 */
import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadInterface } from 'src/auth/interface/jwt-payload';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
  ) {}

 /**
  * Upload Images of User's Vehicle
  * @param files user's selected vehicle image files
  */
  async saveImages (files: [any], user: JwtPayloadInterface, category: string) {
    try {
      const packet: ImageInterface[] = []; 
      // map files to packet
      files.map(item => {
        packet.push({
          data: item.buffer,
          mimeType: item.mimetype,
          originalName: item.originalname,
          encoding: item.encoding,
          size: item.size,
          category: category,
          user_id: user.userId,
        })
      })
      // insert packet into the database
      const upload = await this.imagesModel.insertMany(packet);
      console.log(`packet was inserted`);
      console.log(upload)
      return `Unathi is such a hottie! :)`;
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Find all of user's vehicle images
   * @param user the user property of the request object
   */
  async findAllVehicleImages(user: JwtPayloadInterface) {
    try {
      const images = await this.imagesModel.find({user_id: user.userId});
      console.log(images);
      return images;
    } catch (err) {
      throw new Error(err);
    }
  }
}
