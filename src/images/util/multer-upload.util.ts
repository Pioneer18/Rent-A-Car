import { Injectable } from "@nestjs/common";

@Injectable()
export class MulterUploadUtil {

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