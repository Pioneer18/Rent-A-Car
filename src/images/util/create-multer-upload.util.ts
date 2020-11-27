import { Injectable } from "@nestjs/common";
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { JwtPayloadDto } from "src/auth/dto/jwt-payload";
import { S3Provider } from "../providers/s3.provider";
/**
 * **summary**: create a multerUpload object
 */
@Injectable()
export class CreateMulterUploadUtil {
    constructor(private readonly s3Provider: S3Provider) { }
    private s3 = this.s3Provider.getS3();

    /**
     * **summary**: create the Multer upload object
     * @param req 
     * @param category 
     */
    create = async (req, category) => {
        try {
            // create a multer upload
            const user: JwtPayloadDto = req.user;
            return multer({
                storage: multerS3({
                    s3: this.s3,
                    bucket: `rent-a-car-photos/${user.email}/${category}`,
                    acl: 'public-read',
                    key: function (request, file, cb) {
                        cb(null, `${Date.now()}-${file.originalname}`); // unique id generator for file (image tag)
                    },
                }),
            }).array('upload', 9);
        } catch (err) {
            throw new Error(err)
        }
    }

}