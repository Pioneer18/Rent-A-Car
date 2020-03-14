import { Injectable, Req, Res, Logger, Query } from '@nestjs/common';
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
   * build and upload a document for the selected directory
   * @param {string} directory the s3 bucket directory path
   */
  private uploader = (req, res, path) => {
    const upload = multer({
      storage: multerS3({
        s3,
        bucket: path,
        acl: 'public-read',
        // key: the name of the file
        serverSideEncryption: 'AES256',
        key: (request, file, cb) => {
          cb(null, `${Date.now().toString()} - ${file.originalname}`);
        },
      }),
    }).array('upload', 1);

    upload(req, res, error => {
      if (error) {
        Logger.log('moshi moshi there cowboy');
        return res.status(404).json(`Failed to upload image file: ${error}`);
      }
      return res.status(201).json(req.files[0].location);
    });
  }

  async uploadImages(@Req() req, @Res() res, path, query) {
    // upload to aws s3 bucket
    Logger.log(`query below`);
    Logger.log(query);
    try {
      // const path = process.env.AWS_S3_BUCKET_RENTALS;
      this.uploader(req, res, path);
    } catch (err) {
      return res.status(500).json(`Failed to upload image file: ${err}`);
    }
  }
}
