import { Injectable, Logger } from '@nestjs/common';
import { DeleteS3ImageInterface } from '../interfaces/utils/deleteS3ImagesUtil/delte-s3-image.interface';
import { S3Provider } from '../providers/s3.provider';
/**
 * **summary**: utility for removing images from an AWS S3 Bucket
 */
@Injectable()
export class DeleteS3ImagesUtil {
    constructor(private readonly s3Provider: S3Provider) { }
    private s3 = this.s3Provider.getS3();

    /**
     * **summary**: delete the selected image from it's AWS S3 Bucket
     * @param images the image to be delete
     * @param user the requesting user
     */
    deleteS3Image = async (data: DeleteS3ImageInterface): Promise<void> => {
        const bucket = `rent-a-car-photos`;
        if (data.images[0].location.match(/\/rentals\//)) {
            console.log('Delete Single Image Location');
            console.log(data.images[0].location);
            const split = data.images[0].location.split(/\/rentals\//);
            const key = `${data.user.email}/rentals/${split[1]}`;
            console.log('Delete single Image Key');
            console.log(key);
            await this.s3.deleteObject({ Bucket: bucket, Key: key }, function(err, data) {
                if (err) { Logger.log(err, err.stack); }
                Logger.log(data);
            });
        }
        // delete profile image from s3 bucket
        console.log('Delete a single Profile Image Location');
        console.log(data.images[0].location);
        const split = data.images[0].location.split(/\/profile\//);
        console.log('Delete Single Bucket Image Key');
        const key = `${data.user.email}/profile/${split[1]}`;
        await this.s3.deleteObject({ Bucket: bucket, Key: key }, function(err, data) {
            if (err) { Logger.log(err, err.stack); }
            Logger.log(data);
        });
        return;
    }

    /**
     * **summary**: deleted the selected images from their AWS S3 Bucket
     * @param images the images to be deleted
     * @param user the requesting user
     */
    deleteS3Images = async (data: DeleteS3ImageInterface): Promise<string[]> => {
        // multiple images
        const ids: string[] = [];
        const objects = [];
        const bucket = `rent-a-car-photos`;
        // delete multiple aws rental images
        if (data.images[0].location.match(/\/rentals\//)) {
            console.log(`Deleting multiple Rental Images`);
            data.images.map(item => {
                console.log(item.location);
                const split = item.location.split(/\/rentals\//);
                const key = `${data.user.email}/rentals/${split[1]}`;
                objects.push({ Key: key });
                ids.push(item._id);
            });
            const params = {
                Bucket: bucket,
                Delete: {
                    Objects: objects,
                    Quiet: false,
                },
            };
            console.log(`Delete Multiple Rental Images params`);
            console.log(params);
            await this.s3.deleteObjects(params, function(err, data) {
                if (err) { console.log(err, err.stack); } // an error occurred
                console.log(data);           // successful response
            });
            return ids;
        }
        // delete multiple aws profile images
        console.log('Delete Multiple AWS Profile Images');
        data.images.map(item => {
            console.log(item.location);
            const split = item.location.split(/\/profile\//);
            const key = `${data.user.email}/profile/${split[1]}`;
            objects.push({ Key: key });
            ids.push(item._id);
        });
        const params = {
            Bucket: bucket,
            Delete: {
                Objects: objects,
                Quiet: false,
            },
        };
        console.log(`Delete Multiple Profile Images params`);
        console.log(params);
        await this.s3.deleteObjects(params, function(err, data) {
            if (err) { console.log(err, err.stack); } // an error occurred
            console.log(data);           // successful response
        });
        return ids;
    }
}
