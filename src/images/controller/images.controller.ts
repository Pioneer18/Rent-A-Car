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
     * Upload a single or multiple vehicle photos to be saved
     * @param files fieldName
     * @param maxCount maxCount
     * @param options option
     */
    @Post('upload-vehicle-images')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadVehicleImages(@UploadedFiles() files: [any]) {
        // pass files to images service to be saved in the db
        return await this.imagesService.saveVehicleImages(files);
    }
}
