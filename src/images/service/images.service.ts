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
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as cryptoRandomString from 'crypto-random-string';

@Injectable()
export class ImagesService {

  private s3;
  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly appConfig: AppConfigService,
  ) {
    this.s3 = this.getS3()
  }

  /**
   * TODO: Save with specific [rental id] as well
   * Upload Images of User's Vehicle
   * @param bucket bucket name: param for getSignedUrl
   * @param originalnames name of the uploaded file: param for getSignedUrl
   * @param expires how long the presigned url will be valid
   * @param category rentals / profile
   * @param {string} user_id user id to associate with the image
   * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
   */
  async saveImages() {
    try {
      /**
       * Steps:
       * 1) check for file and if there is more than one: use insertMany or save()

       * 2) if it's only one file:
       * - map an image document with all of the arguments
       * - save the image document
       * 3) if it's multiple files:
       * - create an array of mapped image documents
       * - save the array of mapped image documents
       */



      // const packet: ImageInterface[] = [];
      // map files to packet
      /*
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
      */
      // insert packet into the database
      //await this.imagesModel.insertMany(packet);
      // return { message: 'These are the images that were uploaded', packet };
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Get signed url
  */
  //const url = await this.getSingedUrl(bucket,originalname);
  //Logger.log(`Presigned URL: ${url}`);
  //return {result: result, presigned: url};

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
   * ////////////////////////////////////////////////// AWS CODE BELOW ///////////////////////////////////////////////////////////////////////////////
   */


  /**
   * Connect to the S3 Bucket
   */
  private getS3() {
    return new S3({
      accessKeyId: this.appConfig.access_key_id, // process.env.ACCESS_KEY_ID,
      secretAccessKey: this.appConfig.secret_access_key // process.env.SECRET_ACCESS_KEY,
    });
  }

  // Get Presigned Url to download file
  /**
   * @param originalname file name
   * @param bucket location of the photo
   */
  private getSingedUrl = async (bucket, originalname) => {
    const s3 = this.s3;
    const params = {
      Bucket: bucket,
      Key: originalname,
      Expires: 60 * 60, //1 hour
    };
    try {
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
      Logger.log(url)
      return url;
    } catch (err) {
      if (err) {
        throw new Error(err);
      }
    }
  }

  /**
   * Upload Images to S3 Bucket
   * @param category rentals or profile
   * summary: send the file(s) to the bucket and give each image a random 10 digit 'tag'.
   * the tag ensures no images with the exact same name end up in the same AWS Bucket folder
   */
  async fileupload(req, res, category) {
    // create a multer upload
    const user: JwtPayloadInterface = req.user;
    const multerUpload = multer({
      storage: multerS3({
        s3: this.getS3(),
        bucket: `rent-a-car-photos/${user.email}/${category}`,
        acl: 'public-read',
        key: function( request, file, cb) {
          cb(null, `${cryptoRandomString({length: 10, type: 'numeric'})}-${file.originalname}`); // unique id generator for file (image tag)
        },
      }),
    }).array('upload', 9);
    // Upload the image(s)
    try {
      multerUpload(req, res, function(err){
        if (err) {
          console.log(err);
          return res.status(404).json(`Failed to upload image file: ${err}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (err) {
      return res.status(500).json(`Failed to upload image file: ${err}`)
    }
  }

}
