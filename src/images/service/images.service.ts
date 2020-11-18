/**
 * Save Images
 * Could upload images to AWS S3 bucket and save the links?
 */
import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadInterface } from '../../auth/interface/jwt-payload';
import { S3 } from 'aws-sdk';
import { AppConfigService } from '../../config/configuration.service';


@Injectable()
export class ImagesService {

  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly appConfig: AppConfigService,
  ) { }

  /**
   * TODO: Save with specific [rental id] as well
   * Upload Images of User's Vehicle
   * @param files user's selected vehicle image files
   */
  async saveImages(files: [any], user: JwtPayloadInterface, category: string) {
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
          user_id: user.sub,
        })
      })
      // insert packet into the database
      await this.imagesModel.insertMany(packet);
      return { message: 'These are the images that were uploaded', packet };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Find all of user's vehicle images
   * @param user the user property of the request object
   */
  async findVehicleImages(user: JwtPayloadInterface, img_id?: string) {
    // img_id given from findVehicleImage endpoint
    try {
      let flag;
      img_id ? flag = 'single' : flag = 'multiple';
      // find multiple images
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ user_id: user.sub, category: 'Vehicle' });
        return { count: images.length, images: images }
      }
      // find a specific image
      return await this.imagesModel.findById(img_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Find all of user's profile images
   * @param user the user property of the request object
   */
  async findProfileImages(user: JwtPayloadInterface, img_id?: string) {
    try {
      let flag;
      img_id ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ user_id: user.sub })
        return { count: images.length, images: images };
      };
      return await this.imagesModel.findById(img_id);
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Delete all of a user's images by category
   * @param user the user property of the request object
   */
  async deleteImages(user: JwtPayloadInterface, category) {
    try {
      return await this.imagesModel.deleteMany({ user_id: user.sub, category });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * AWS Upload and 
   * Seems you can actually make folders on the fly
   * Images making it up there, but access denied when trying to view them?
   */
  async upload(file) {
    console.log('Here is the File:')
    console.log(file);
    const { originalname } = file;
    const bucketS3 = 'rent-a-car-photos/vehicles'; // the base url is rent-a-car-photos/
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket, // rentals/
      Key: String(name),
      Body: file,
    };
    const url = s3.getSignedUrl('getObject', params);
    console.log(`Here is the Url`)
    console.log(url);
    console.log('S3 UPLOAD PARAMS:')
    console.log(params);
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
  }

}
