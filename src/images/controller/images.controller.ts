import { Controller, Post, Req, Res, Logger, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '../service/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}
    /*
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res) {
        const path = process.env.AWS_S3_BUCKET_RENTALS;
        return await this.imagesService.uploadImages(req, res, path);
    }

    @Post('upload-profile-image')
    async uploadProfileImage(@Req() req, @Res() res) {
        const path = process.env.AWS_S3_BUCKET_PROFILE;
    }
    */

    /**
     * 1) upload vehicle photos to db with reference to the logged in user
     * 2) upload profile photo to db with reference to the logged in user
     * 3) remove specific photo from vehicle photo db
     * 4) remove specific photo from profile photo db
     */


    /**
     * upload a single or multiple photos to be saved
     * @param files image files
     */
    @Post('upload-vehicle-images')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadVehicleImages(@UploadedFiles() files: any) {
        console.log(files);
    }
}
