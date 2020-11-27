import { Injectable, Logger, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interface/modelInterface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadDto } from '../../auth/dto/jwt-payload';
import { AppConfigService } from '../../config/configuration.service';
import { profile } from '../../common/Const';
import { ImageDto } from '../dto/image.dto';
import { ProcessSaveDataUtil } from '../util/process-save-data.util';
import { ProcessedSaveDataDto } from '../dto/processed-save-data.dto';
import { S3Provider } from '../providers/s3.provider';
import { CreateMulterUploadUtil } from '../util/create-multer-upload.util';
import { MulterUploadUtil } from '../util/multer-upload.util';
import { ImageQueryResultsDto } from '../dto/image-query-results.dto';
import { DeleteS3ImagesUtil } from '../util/delete-s3-images.util';
/**
 * **summary**: contains all of the functionality for uploading and managing photos in the application.
 * - note: for security, user_id is required for all queries to verify the queried images belong to the requesting user.
 * this makes queries slightly less selective and less efficient, but more secure.
 */
@Injectable()
export class ImagesService {

  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly appConfig: AppConfigService,
    private readonly processSaveDataUtil: ProcessSaveDataUtil,
    private readonly s3Provider: S3Provider,
    private readonly createMulterUploadUtil: CreateMulterUploadUtil,
    private readonly multerUploadUtil: MulterUploadUtil,
    private readonly deleteS3ImagesUtil: DeleteS3ImagesUtil,
  ) { }
  s3 = this.s3Provider.getS3();

  /**
   * **summary**: saves AWS uploaded images to the database. This method is passed as an argument to the fileUploadAndSave method 
   * @param files array of files
   * @param category rentals / profile
   * @param {string} user_id user id to associate with the image
   * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
   */
  saveImages = async (files, category, user_id, rental_id, model) => {
    try {
      const { packet, image }: ProcessedSaveDataDto = await this.processSaveDataUtil.process(files, user_id, rental_id, category);
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
   * **summary**: query multiple rental images by userId and rental_id. The userId
   * is just to ensure only the user's photos are returned and not another user's rental images
   * @param user the user property of the request object
   * @param img_id id of an image; if provided only this image will be found
   * @param rental_id the id of the rental
   * @param user_id used to verify the image belongs to the requesting user
   */
  findRentalImages = async (img_id: string | null, rental_id: string | null, user: JwtPayloadDto): Promise<ImageQueryResultsDto> => {
    // img_id given from findVehicleImage endpoint
    try {
      let flag;
      img_id !== null ? flag = 'single' : flag = 'multiple';
      // find multiple images
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ rental_id: rental_id, user_id: user.userId });
        return { count: images.length, images: images }
      }
      // find a specific image
      const image = await this.imagesModel.findById(img_id);
      return { count: 1, images: image }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: query multiple profile images by user_id and profile category, or find a specific profile photo by id
   * @param user the user property of the request object
   */
  findProfileImages = async (user: JwtPayloadDto, img_id?: string) => {
    try {
      let flag;
      img_id ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ user_id: user.userId })
        return { count: images.length, images: images };
      };
      const image = await this.imagesModel.findById(img_id);
      return { count: 1, images: image }
    } catch (err) {
      throw new Error(err)
    }
  }

  /**
   * **sumamry**: Delete a single or multiple of a user's selected images from the S3 Bucket and database
   * @param category the images category; rentals or profile
   * @param user_id used to verify the photos belong to the requesting user
   */
  deleteImages = async (images: ImageDto[], user: JwtPayloadDto) => {
    try {
      if (images && images.length > 0) {
        if (images.length === 1) {
          await this.deleteS3ImagesUtil.deleteS3Image(images, user);
          return await this.imagesModel.deleteOne({ _id: images[0]._id, user_id: user.userId });
        }
        const ids = await this.deleteS3ImagesUtil.deleteS3Images(images, user);
        return await this.imagesModel.deleteMany({ _id: { $in: ids }, user_id: user.userId })
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: delete all images of the selected rental or profile from the S3 bucket and database
   * @param user_id used to locate the user's photos as well as verify they belong to them
   * @param rental_id the id of the rental
   */
  deleteAllImages = async (user: JwtPayloadDto, rental_id: string) => {
    // delete all images of the selected rental
    if (user && rental_id !== null) {
      return await this.imagesModel.deleteMany({ rental_id: rental_id, user_id: user.userId });
    }
    // delete all of the user's profile images
    if (user && rental_id === null) {
      return await this.imagesModel.deleteMany({ user_id: user.userId, category: profile });
    }
  }

  /**
   * **summary**: send the file(s) to the bucket and attach a timestamp to each filename
   * @param req the request
   * @param res the response
   * @param category rentals or profile
   * @param rental_id the rental_id for rental image uploads
   * @param saveImages the images.service.saveImages method
   */
  fileuploadAndSave = async (req, res, category, rental_id, saveimages) => {
    try {
      // create a multer upload
      const user: JwtPayloadDto = req.user;
      const multerUpload = await this.createMulterUploadUtil.create(req, category)
      // Upload the image(s)
      const model = this.imagesModel;
      await this.multerUploadUtil.upload(req, res, multerUpload, saveimages, category, user, rental_id, model);
    } catch (err) {
      return res.status(500).json(`Failed to upload image file: ${err}`)
    }
  }
}
