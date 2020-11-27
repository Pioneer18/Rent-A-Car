import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageInterface } from '../interfaces/modelInterface/image.interface';
import { Model } from 'mongoose';
import { JwtPayloadInterface } from '../../auth/interfaces/jwt-payload.interface';
import { profile } from '../../common/Const';
import { SaveImagesInterface } from '../interfaces/service/save-images.interface'
import { ProcessSaveDataUtil } from '../util/process-save-data.util';
import { ProcessedSaveDataInterface } from '../interfaces/utils/processed-save-data.interface';
import { CreateMulterUploadUtil } from '../util/create-multer-upload.util';
import { MulterUploadUtil } from '../util/multer-upload.util';
import { DeleteS3ImagesUtil } from '../util/delete-s3-images.util';
import { FindRentalImagesInterface } from '../interfaces/service/find-rental-images.interface';
import { DeleteImagesInterface } from '../interfaces/service/delete-images.interface';
import { FindProfileImageInterface } from '../interfaces/service/find-profile-image.interface';
import { DeleteAllImagesInterface } from '../interfaces/service/delete-all-images.interface';
import { FileUploadAndSaveInterface } from '../interfaces/service/fileupload-and-save.interface';
import { RetrievedImagesInterface } from '../interfaces/service/retrieved-images.interface';
import { DeleteImagesResponseInterface } from '../interfaces/service/delete-images-response.interface';
/**
 * **summary**: contains all of the functionality for uploading and managing photos in the application.
 * - note: for security, user_id is required for all queries to verify the queried images belong to the requesting user.
 * this makes queries slightly less selective and less efficient, but more secure.
 */
@Injectable()
export class ImagesService {

  constructor(
    @InjectModel('Images') private readonly imagesModel: Model<ImageInterface>,
    private readonly processSaveDataUtil: ProcessSaveDataUtil,
    private readonly createMulterUploadUtil: CreateMulterUploadUtil,
    private readonly multerUploadUtil: MulterUploadUtil,
    private readonly deleteS3ImagesUtil: DeleteS3ImagesUtil,
  ) { }

  /**
   * **summary**: saves AWS uploaded images to the database. This method is passed as an argument to the fileUploadAndSave method 
   * @param files array of files
   * @param category rentals / profile
   * @param {string} user_id user id to associate with the image
   * @param {string | null} rental_id id of the rental (if it's a rental image): Check for null
   */
  saveImages = async (data: SaveImagesInterface) => {
    try {
      const { packet, image }: ProcessedSaveDataInterface = await this.processSaveDataUtil.process(data);
      let flag;
      packet === null ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        return await this.imagesModel.insertMany(packet);
      }
      return await this.imagesModel.save(image)
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
  findRentalImages = async (data: FindRentalImagesInterface): Promise<RetrievedImagesInterface> => {
    // img_id given from findVehicleImage endpoint
    try {
      let flag;
      data.img_id !== null ? flag = 'single' : flag = 'multiple';
      // find multiple images
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ rental_id: data.rental_id, user_id: data.user.userId });
        return { count: images.length, images: images }
      }
      // find a specific image
      const image = await this.imagesModel.findById(data.img_id);
      return { count: 1, images: image }
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: query multiple profile images by user_id and profile category, or find a specific profile photo by id
   * @param user the user property of the request object
   */
  findProfileImages = async (data: FindProfileImageInterface): Promise<RetrievedImagesInterface> => {
    try {
      let flag;
      data.img_id ? flag = 'single' : flag = 'multiple';
      if (flag === 'multiple') {
        const images = await this.imagesModel.find({ user_id: data.user.userId })
        return { count: images.length, images: images };
      };
      const image = await this.imagesModel.findById(data.img_id);
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
  deleteImages = async (data: DeleteImagesInterface): Promise<DeleteImagesResponseInterface> => {
    try {
      if (data.images && data.images.length > 0) {
        if (data.images.length === 1) {
          await this.deleteS3ImagesUtil.deleteS3Image(data.images, data.user);
          return await this.imagesModel.deleteOne({ _id: data.images[0]._id, user_id: data.user.userId });
        }
        const ids = await this.deleteS3ImagesUtil.deleteS3Images(data.images, data.user);
        return await this.imagesModel.deleteMany({ _id: { $in: ids }, user_id: data.user.userId })
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
  deleteAllImages = async (data: DeleteAllImagesInterface): Promise<DeleteImagesResponseInterface> => {
    // delete all images of the selected rental
    if (data.user && typeof data.rental_id === 'string') {
      return await this.imagesModel.deleteMany({ rental_id: data.rental_id, user_id: data.user.userId });
    }
    // delete all of the user's profile images
    if (data.user && data.rental_id === undefined || typeof data.rental_id !== 'string') {
      return await this.imagesModel.deleteMany({ user_id: data.user.userId, category: profile });
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
  fileuploadAndSave = async (data: FileUploadAndSaveInterface): Promise<string> => {
    try {
      // create a multer upload
      const user: JwtPayloadInterface = data.req.user;
      const multerUpload = await this.createMulterUploadUtil.create(data.req, data.category)
      // Upload the image(s)
      await this.multerUploadUtil.upload(data.req, data.res, multerUpload, this.saveImages, data.category, user, data.rental_id);
    } catch (err) {
      return data.res.status(500).json(`Failed to upload image file: ${err}`)
    }
  }
}
