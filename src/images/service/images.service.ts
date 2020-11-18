/**
 * Save Images
 * Could upload images to AWS S3 bucket and save the links?
 */
import { Injectable, Logger, Req, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadInterface } from '../../auth/interface/jwt-payload';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import* as multerS3 from 'multer-s3'
import { AppConfigService } from '../../config/configuration.service';


@Injectable()
export class ImagesService {

  private s3
  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly appConfig: AppConfigService,
      ) {
        this.s3 = new AWS.S3();
        AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

      }

 /**
  * TODO: Save with specific [rental id] as well
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
          user_id: user.sub,
        })
      })
      // insert packet into the database
      await this.imagesModel.insertMany(packet);
      return {message: 'These are the images that were uploaded', packet};
    } catch(err) {
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
        const images = await this.imagesModel.find({user_id: user.sub, category: 'Vehicle'});
        return { count: images.length, images: images}
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
        const images = await this.imagesModel.find({user_id: user.sub})
        return { count: images.length, images: images };
      };
      return await this.imagesModel.findById(img_id);
    } catch(err) {
      throw new Error(err)
    }
  }

  /**
   * Delete all of a user's images by category
   * @param user the user property of the request object
   */
  async deleteImages(user: JwtPayloadInterface, category) {
    try {
      return await this.imagesModel.deleteMany({ user_id: user.sub, category});
    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * build an upload document for the selected directory
   * @param {string} directory the s3 bucket directory path
   */
  private uploader = (req, res, path) => {
    const upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: 'rentals/', // process.env.AWS_S3_BUCKET_RENTALS
        acl: 'public-read',
        key: (request, file, cb) => {
          cb(null, `${Date.now().toString()} - ${file.originalname}`);
        },
      }),
    }).array('upload', 1);

    upload(req, res, error => {
      if (error) {
        return res.status(404).json(`Failed to upload image file: ${error}`);
      }
      return res.status(201).json(req.files[0].location);
    });
  }

  async uploadImages(@Req() req, @Res() res, path) {
    // upload to aws s3 bucket
    try {
      Logger.log('below is the req.body');
      Logger.log(Object.keys(req));
      Logger.log(req.headers);
      // const path = process.env.AWS_S3_BUCKET_RENTALS;
      this.uploader(req, res, path);
    } catch (err) {
      return res.status(500).json(`Failed to upload image file: ${err}`);
    }
  }

}
