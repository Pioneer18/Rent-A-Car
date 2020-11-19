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
   * @param bucketPath bucket name: param for getSignedUrl
   * @param originalname name of the uploaded file: param for getSignedUrl
   * @param expires how long the presigned url will be valid
   * @param category rentals / profile
   * @param {string} user_id user id to associate with the image
   * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
   */
  async saveImages(files: [any],) {
    try {






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
  //console.log(`Presigned URL: ${url}`);
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
   * Upload
   * summary: call the uploadS3() function with the file, the completed bucket path
   * and the file name
   * @param {string} file the file to be uploaded
   * {string} bucketPath {email}/rentals or {email}/profile
   * @param {string} user req.user; Jwt decoded payload
   * @param {string} category rentals / profile
   * @param {string | null} rental_id id of the rental the images will be linked to
   */
  async upload(file, user: JwtPayloadInterface, category: string, rental_id: string | null) {
    // this is a private function to call uploadS3
    /**
     * create bucketPath and get the originalname of the file
     */
    console.log('Here is the File:')
    console.log(file);
    const { originalname } = file;
    const bucketPath: string = `${user.email}/${category}`;
    const bucket: string = 'rent-a-car-photos/' + bucketPath; // TODO: make this an environment variable
    console.log(`The Bucket: ${bucket}`);

    // Upload the images to the s3 bucket
    const result = await this.uploadS3(file.buffer, bucket, originalname);

    /**
     * Save Images to DB
     * @param bucketPath bucket name: param for getSignedUrl
     * @param originalname name of the uploaded file: param for getSignedUrl
     * @param expires how long the presigned url will be valid
     * @param category rentals / profile
     * @param {string} user_id user id to associate with the image
     * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
     */
    // await saveImages();
  }

  /**
   * Upload file to AWS S3 Bucket
   * @param {string} file the file to be uploaded
   * @param {string} bucket the bucket path
   * @param {string} originalname the name of the file
   */
  private async uploadS3(file, bucket, originalname) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket, // bucket name and path
      Key: String(originalname), // file name
      Body: file, // file.buffer
    };
    console.log('S3 UPLOAD PARAMS:')
    console.log(params);
    return new Promise((resolve, reject) => {
      s3.upload(params, {}, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  private getS3() {
    return new S3({
      accessKeyId: this.appConfig.access_key_id, // process.env.ACCESS_KEY_ID,
      secretAccessKey: this.appConfig.secret_access_key // process.env.SECRET_ACCESS_KEY,
    });
  }

  // Get Presigned Url to download file
  /**
   * @param originalname file name
   * @param bucketPath location of the photo
   */
  private getSingedUrl = async (bucketPath, originalname) => {
    const s3 = this.getS3()
    const params = {
      Bucket: bucketPath,
      Key: originalname,
      Expires: 60 * 60, //1 hour
    };
    try {
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
      console.log(url)
      return url;
    } catch (err) {
      if (err) {
        throw new Error(err);
      }
    }
  }
}
