import { Controller, Post, Req, Res, Logger, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { ImagesService } from '../service/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

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
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadVehicleImages(@UploadedFiles() files: [any], @Req() req) {
        // pass files to images service to be saved in the db
        return await this.imagesService.saveVehicleImages(files, req.user);
    }
}
