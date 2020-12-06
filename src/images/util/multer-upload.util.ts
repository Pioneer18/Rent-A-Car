import { Injectable } from '@nestjs/common';
import { MulterUploadUtilInterface } from '../interfaces/utils/multerUploadUtil/multer-upload-util.interface';
/**
 * **summary**: upload a single or multiple files as a multerUpload
 */
@Injectable()
export class MulterUploadUtil {

    /**
     * **summary**: upload the provided files with the multerUpload object and return the
     * @param req the client request
     * @param res the response
     * @param multerUpload uploader
     * @param saveImages this.saveImages() method to save the uploaded image data
     * @param category the image category: rentals || profile
     * @param user the user
     * @param rental_id id of the rental if this is a rental images upload
     * @param model the database model which the this.saveImages() method will save images to
     */
    upload = async (data: MulterUploadUtilInterface): Promise<void> => {
        try {
            await data.multerUpload(data.req, data.res, function(err) {
                if (err) {
                    console.log(err);
                    return data.res.status(404).json(`Failed to upload image file: ${err}`);
                }
                // Save the Images
                data.saveImages({
                    files: data.req.files,
                    category: data.category,
                    user_id: data.user.userId,
                    rental_id: data.rental_id,
                });
                // return the aws download link
                return data.res.status(201).json(data.req.files[0].location);
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}
