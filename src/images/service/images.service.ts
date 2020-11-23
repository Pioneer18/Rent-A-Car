import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadInterface } from '../../auth/interface/jwt-payload';
import { S3 } from 'aws-sdk';
import { AppConfigService } from '../../config/configuration.service';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { profile, rentals } from '../../common/Const';
import { ImageDto } from '../dto/image.dto';
import { ProcessSaveDataUtil } from '../util/process-save-data.util';
import { ProcessedSaveDataInterface } from '../interface/processed-save-data.interface';
/**
 * Images Service
 * written by: Jonathan Sells
 * methods: [saveImages, findRentalImages, findProfileImages, deleteImages, getS3, fileUploadAndSave]
 */
@Injectable()
export class ImagesService {

  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly appConfig: AppConfigService,
    private readonly processSaveDataUtil: ProcessSaveDataUtil
  ) { }

  /**
   * Save uploaded images
   * Summary: Saves uploaded images to the database. This method is passed as an argument to the fileUploadAndSave method 
   * @param files array of files
   * @param category rentals / profile
   * @param {string} user_id user id to associate with the image
   * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
   */
  saveImages = async (files, category, user_id, rental_id, model) => {
    try {
      const { packet, image }: ProcessedSaveDataInterface = await this.processSaveDataUtil.process(files, user_id, rental_id, category);
      let flag;
      packet === null ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        return await model.insertMany(packet);
      }
      return await model.save(image)
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Find Rental Images
   * Summary: query multiple rental images by userId and rental_id
   * @param user the user property of the request object
   * @param img_id id of an image; if provided only this image will be found
   * @param rental_id the id of the rental
   * @param user_id used to verify the image belongs to the requesting user
   */
  findRentalImages = async (img_id: string | null, rental_id: string | null, user_id: string) => {
    // img_id given from findVehicleImage endpoint
    try {
      let flag;
      img_id !== null ? flag = 'single' : flag = 'multiple';
      // find multiple images
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ rental_id: rental_id, user_id: user_id });
        return { count: images.length, images: images }
      }
      // find a specific image
      return await this.imagesModel.findById(img_id);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Find Profile Images
   * Summary: query multiple profile images by user_id and profile category, or find a specific profile photo by id
   * @param user the user property of the request object
   */
  findProfileImages = async (user: JwtPayloadInterface, img_id?: string) => {
    try {
      let flag;
      img_id ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ user_id: user.userId })
        return { count: images.length, images: images };
      };
      return await this.imagesModel.findById(img_id);
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * Delete Images
   * Sumamry: Delete a single or multiple of user's selected images
   * @param category the images category; rentals or profile
   * @param user_id used to verify the photos belong to the requesting user
   */
  deleteImages = async (images: ImageDto[]) => {
    try {
      if (images && images.length > 0) {
        if (images.length === 1) {
          return await this.imagesModel.deleteOne({ _id: images[0]._id });
        }
        const ids = [];
        images.map(item => {
          ids.push(item._id);
        });
        return await this.imagesModel.deleteMany({ _id: { $in: ids } })
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Delete All Images
   * Summary: Delete all images of the selected rental or profile
   * @param user_id used to locate the user's photos as well as verify they belong to them
   * @param rental_id the id of the rental
   */
  deleteAllImages = async (user: JwtPayloadInterface, rental_id: string) => {
    // delete all images of the selected rental
    if (user && rental_id !== null) {
      return await this.imagesModel.deleteMany({ rental_id: rental_id });
    }
    // delete all of the user's profile images
    if (user && rental_id === null) {
      return await this.imagesModel.deleteMany({ user_id: user.userId, category: profile });
    }
  }


  /**
   * Connect to the S3 Bucket
   */
  private getS3 = () => {
    return new S3({
      accessKeyId: this.appConfig.access_key_id, // process.env.ACCESS_KEY_ID,
      secretAccessKey: this.appConfig.secret_access_key // process.env.SECRET_ACCESS_KEY,
    });
  }

  /**
   * Upload Images to S3 Bucket
   * summary: send the file(s) to the bucket and attach a timestamp to each filename
   * @param req the request
   * @param res the response
   * @param category rentals or profile
   * @param rental_id the rental_id for rental image uploads
   * @param saveImages the images.service.saveImages method
   */
  fileuploadAndSave = async (req, res, category, rental_id, saveimages) => {
    try {
      // create a multer upload
      const user: JwtPayloadInterface = req.user;
      const multerUpload = multer({
        storage: multerS3({
          s3: this.getS3(),
          bucket: `rent-a-car-photos/${user.email}/${category}`,
          acl: 'public-read',
          key: function (request, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`); // unique id generator for file (image tag)
          },
        }),
      }).array('upload', 9);
      // Upload the image(s)
      const model = this.imagesModel;
      await multerUpload(req, res, function (err) {
        if (err) {
          console.log(err);
          return res.status(404).json(`Failed to upload image file: ${err}`);
        }
        // Save the Images
        console.log(user)
        saveimages(req.files, category, user.userId, rental_id, model);
        return res.status(201).json(req.files[0].location);
      });

    } catch (err) {
      return res.status(500).json(`Failed to upload image file: ${err}`)
    }
  }

  // Get Presigned Url to download file
  /**
   * @param originalname file name
   * @param bucket location of the photo
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
  */


}
