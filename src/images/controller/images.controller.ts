import { Controller, Post, Req, UseGuards, Body, Get, Query, Res } from '@nestjs/common';
import { AppConfigService } from '../../config/configuration.service';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { ImagesService } from '../service/images.service';
import { response } from 'express';
import { profile, rentals } from 'src/common/Const';
/**
 * Image Controller
 * written by: Jonathan Sells
 */
@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
        private readonly appConfig: AppConfigService,
    ) { }

    /**
     * Upload a single or multiple rental photos to be saved
     * @param files fieldName
     * @param maxCount maxCount
     * @param options option
     */
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res, @Query() params) {
        try {
            await this.imagesService.fileuploadAndSave(req, res, rentals, params.rental_id, this.imagesService.saveImages)
        } catch (err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`);
        }
    }

    /**
     * Upload Profile Images
     * Summary: Upload a single or multiple profile photos to be saved
     * @param files fieldName
     */
    @Post('upload-profile-images')
    async uploadProfileImage(@Req() req, @Res() res, @Query() params) {
        try {
            await this.imagesService.fileuploadAndSave(req, res, profile, params.rental_id, this.imagesService.saveImages)
        } catch (err) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${err.message}`);
        }
    }

    /**
     * Finad Rental Images
     * Summary: Find all of a rentals images
     * @param req the request object, which has a user property
     */
    @Get('find-rental-images')
    async findAllVehilceImages(@Query() params) {
        return await this.imagesService.findRentalImages(null, params.rental_id);
    }

    /**
     * Find Rental Image
     * Summary: Find a vehicle image by id
     * @param image the id of the image to find
     */
    @Get('find-rental-image')
    async findVehicleImage(@Query() params: { image_id: string }) {
        return await this.imagesService.findRentalImages(params.image_id, null);
    }

    /**
     * Find Profile Images
     * Summary: Find a user profile image
     * @param req request object
     */
    @Get('find-profile-images')
    async findProfileImages(@Req() req) {
        return await this.imagesService.findProfileImages(req.user);
    }

    /**
     * Find Profile Image
     * Summary: Find a user profile image
     * @param req request object
     */
    @Get('find-profile-image')
    async findProfileImage(@Req() req, @Body() image: { id: string }) {
        return await this.imagesService.findProfileImages(req.user, image.id);
    }

    /**
     * Delete Rental Images
     * Summary: Delete a single or multiple images of a rental
     * @param category both or a single one
     */
    @Post('delete-rental-images')
    async deleteRentalImages(@Query() params: { category: string }, @Req() req) {
        return await this.imagesService.deleteImages(req.user, params.category);
    }

    /**
     * Delete all Rental Images
     * Summary: delete all images for a selected rental
     */
    @Post('delete-all-rental-images')
    async deleteAllRentalImages(@Query() params, @Req() req) {
        return await this.imagesService.deleteAllImages(req.user, params.rental_id);
    }

    /**
     * Delete Profile Images
     * Summary: Delete a single or multiple of a user's profile images
    */
   @Post('delete-profile-images')
   async deleteProfileImages(@Query() params: { category: string }, @Req() req) {
        return await this.imagesService.deleteImages(req.user, params.category);
   }

   /**
    * Delete All Profile Images
    * Summary: Delete all of the user's profile images
    */
   @Post('delete-all-profile-images')
   async deleteAllProfileImages(@Req() req) {
        return await this.imagesService.deleteAllImages(req.user, null);
   }

}
