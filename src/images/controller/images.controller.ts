import { Controller, Post, Req, UseInterceptors, UploadedFiles, UseGuards, Body, Get, Param, Query, Res } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { AppConfigService } from '../../config/configuration.service';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { ImagesService } from '../service/images.service';

@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService, private readonly appConfig: AppConfigService) { }

    /**
     * 1) upload vehicle photos to db with reference to the logged in user
     * 2) find vehicle photos in the db 
     * 3) upload profile photo to db with reference to the logged in user
     * 4) find profile photos in the db
     * 5) remove specific photo(s) from vehicle photo db
     * 6) remove specific photo(s) from profile photo db
     */


    /**
     * Upload a single or multiple vehicle photos to be saved
     * @param files fieldName
     * @param maxCount maxCount
     * @param options option
     */
    @Post('upload-vehicle-images')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadVehicleImages(@UploadedFiles() files: [any], @Req() req) {
        // pass files to images service to be saved in the db
        return await this.imagesService.saveImages(files, req.user, 'Vehicle');
    }

    /**
     * Upload a single photo to be saved
     * @param files fieldName
     */
    @Post('upload-profile-images')
    @UseInterceptors(FilesInterceptor('file'))
    async uploadProfileImage(@UploadedFiles() file, @Req() req) {
        return await this.imagesService.saveImages(file, req.user, 'Profile');
    }

    /**
     * Find all vehicle images related to a user
     * @param req the request object, which has a user property
     */
    @Get('find-all-vehicle-images')
    async findAllVehilceImages(@Req() req) {
        return await this.imagesService.findVehicleImages(req.user);
    }

    /**
     * Find vehicle image by id
     * @param image the id of the image to find
     */
    @Get('find-vehicle-image')
    async findVehicleImage(@Req() req, @Body() image: { id: string }) {
        return await this.imagesService.findVehicleImages(req.user, image.id)
    }

    /**
     * Find user profile image
     * @param req request object
     */
    @Get('find-profile-images')
    async findProfileImages(@Req() req) {
        return await this.imagesService.findProfileImages(req.user);
    }

    /**
     * Find user profile image
     * @param req request object
     */
    @Get('find-profile-image')
    async findProfileImage(@Req() req, @Body() image: { id: string }) {
        return await this.imagesService.findProfileImages(req.user, image.id);
    }

    /**
     * TODO: Delete selected images
     * @param category both or a single one
     */
    @Post('delete-all-images')
    async deleteAllImages(@Query() params: {category: string}, @Req() req) {
        return await this.imagesService.deleteImages(req.user, params.category)
    }

    /**
    * Delete single image
    */

    /**
     * Upload to AWS S3 Bucket
     */
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res) {
        // const path = process.env.AWS_S3_BUCKET_RENTALS;
        const path = this.appConfig.aws_s3_bucket_rentals;
        return await this.imagesService.uploadImages(req, res, path);
    }

    @Post('upload-profile-image')
    async uploadProfileImageToS3(@Req() req, @Res() res) {
        const path = this.appConfig.aws_s3_bucket_profile;
        return await this.imagesService.uploadImages(req, res, path);
    }
}
