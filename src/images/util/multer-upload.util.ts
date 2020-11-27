import { Injectable } from "@nestjs/common";
/**
 * **summary**: upload a single or multiple files as a multerUpload
 */
@Injectable()
export class MulterUploadUtil {

    /**
     * **summary**: upload the provided files with the multerUpload object
     * @param req the client request
     * @param res the response
     * @param multerUpload uploader
     * @param saveImages this.saveImages() method to save the uploaded image data
     * @param category the image category: rentals || profile
     * @param user the user
     * @param rental_id id of the rental if this is a rental images upload
     * @param model the database model which the this.saveImages() method will save images to
     */
    upload = async (req, res, multerUpload, saveImages, category, user, rental_id, model): Promise<void> => {
        try {
            await multerUpload(req, res, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(404).json(`Failed to upload image file: ${err}`);
                }
                // Save the Images
                console.log(user)
                saveImages(req.files, category, user.userId, rental_id, model);
                return res.status(201).json(req.files[0].location);
            });
        } catch (err) {
            throw new Error(err)
        }
    }
}