import { Controller, Post, Req, Res, Logger } from '@nestjs/common';
import { ImagesService } from '../service/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res) {
        const path = process.env.AWS_S3_BUCKET_RENTALS;
        return await this.imagesService.uploadImages(req, res, path);
    }

    @Post('upload-profile-image')
    async uploadProfileImage(@Req() req, @Res() res) {
        const path = process.env.AWS_S3_BUCKET_PROFILE;
    }
}
