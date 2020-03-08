import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class ImagesService {
    /**
     * build an upload document for the selected directory
     * @param {string} directory the s3 bucket directory path
     */
  private upload = directory => {
    const upload = multer({
      storage: multerS3({
        s3,
        bucket: directory,
        acl: 'public-read',
        key: (request, file, cb) => {
          cb(null, `${Date.now().toString()} - ${file.originalname}`);
        },
      }),
    }).array('upload', 1);
    return upload;
  }

  async uploadRentalImage(@Req() req, @Res() res, directory) {
    // upload to aws s3 bucket
    try {
        this.upload(directory);
    } catch (err) {
        throw new Error(err);
    }
  }
}
