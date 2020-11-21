import { Controller, Post, Req, UseInterceptors, UploadedFiles, UseGuards, Body, Get, Param, Query, Res, UploadedFile } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppConfigService } from '../../config/configuration.service';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { ImagesService } from '../service/images.service';
import { Request, response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService, private readonly appConfig: AppConfigService) { }

    /**
     * 1) upload rental photos to db with reference to the logged in user
     * 3) upload profile photo to db with reference to the logged in user
     * 2) find rental photos in the db 
     * 4) find profile photos in the db
     * 5) remove specific rental photo(s) from db
     * 6) remove specific profile photo(s) from db
     */


    /**
     * Upload a single or multiple rental photos to be saved
     * @param files fieldName
     * @param maxCount maxCount
     * @param options option
     */
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res) {
        // return await this.imagesService.multerUpload()
    }

    /**
     * Upload a single or multiple profile photos to be saved
     * @param files fieldName
     */
    @Post('upload-profile-images')
    async uploadProfileImage(@Req() req, @Res() res) {
        // return await this.imagesService.multerUpload()
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
     * Find a vehicle image by id
     * @param image the id of the image to find
     */
    @Get('find-vehicle-image')
    async findVehicleImage(@Req() req, @Body() image: { id: string }) {
        return await this.imagesService.findVehicleImages(req.user, image.id)
    }

    /**
     * Find a user profile image
     * @param req request object
     */
    @Get('find-profile-images')
    async findProfileImages(@Req() req) {
        return await this.imagesService.findProfileImages(req.user);
    }

    /**
     * Find a user profile image
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
    async deleteAllImages(@Query() params: { category: string }, @Req() req) {
        return await this.imagesService.deleteImages(req.user, params.category)
    }

    /**
    * Delete a single image
    */

    /**
     * DEPRECATED
     * Upload to AWS S3 Bucket
     * Bucket base: rent-a-car-photos/{email}/{vehicle or profile}
     * @param {string} file the file(s) being uploaded
     * @param {object} req.user the logged in user
     * @param {string} category rentals or profile
     * @param {string} rental_id id of the rental; if this is a rental image upload
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@UploadedFiles() files, @Req() req, @Body() rental_id) {
        return await this.imagesService.upload(files, req.user, 'test', rental_id);
    }
    */

    /**
     * Upload images to AWS S3 Bucket
     * Bucket: rent-a-car-photos/{user_email}/{category}/{tag}/
     * uses handler uses multer to extract file(s) from the Request
     * TODO: This is 2 Routes - 1) Rentals and 2) Profile image(s) upload
     */
    @Post('multer-upload')
    async multerUpload(@Req() req, @Res() res) {
        try {
            await this.imagesService.fileupload(req, res)
        } catch(err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`)
        }
    }

}
