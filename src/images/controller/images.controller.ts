import { Controller, Post, Req, UseGuards, Body, Get, Query, Res} from '@nestjs/common';
import { AppConfigService } from '../../config/configuration.service';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { ImagesService } from '../service/images.service';
import { response } from 'express';

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
        try {
            await this.imagesService.fileuploadAndSave(req, res, 'rentals', this.imagesService.saveImages)
        } catch(err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`)
        }
    }

    /**
     * Upload a single or multiple profile photos to be saved
     * @param files fieldName
     */
    @Post('upload-profile-images')
    async uploadProfileImage(@Req() req, @Res() res) {
        try {
            await this.imagesService.fileuploadAndSave(req, res, 'profile', this.imagesService.saveImages)
        } catch(err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`)
        }
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
     * Upload images to AWS S3 Bucket
     * Bucket: rent-a-car-photos/{user_email}/{category}/{tag}/
     * uses handler uses multer to extract file(s) from the Request
     * TODO: This is 2 Routes - 1) Rentals and 2) Profile image(s) upload
     */
    @Post('multer-upload')
    async multerUpload(@Req() req, @Res() res) {
        try {
            await this.imagesService.fileuploadAndSave(req, res, 'testing_category', this.imagesService.saveImages)
        } catch(err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`)
        }
    }

}
