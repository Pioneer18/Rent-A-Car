import { Controller, Post, Req, UseGuards, Body, Get, Query, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/gaurds/jwt-auth.guard';
import { ImagesService } from '../service/images.service';
import { response, Response } from 'express';
import { profile, rentals } from '../../common/Const';
import { ImageDto } from '../dto/image.dto';
import { RetrievedImagesInterface } from '../interfaces/service/retrieved-images.interface';
import { DeleteResponseInterface } from '../../common/interfaces/delete-response.interface';
/**
 * **summary**: Controller for managing images in the application
 */
@UseGuards(JwtAuthGuard)
@Controller('images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService,
    ) { }

    /**
     * Upload a single or multiple rental photos to be saved
     * @param files fieldName
     * @param maxCount maxCount
     * @param options option
     */
    @Post('upload-rental-images')
    async uploadRentalImages(@Req() req, @Res() res, @Query() params): Promise<Response> {
        try {
            await this.imagesService.fileuploadAndSave({req, res, category: rentals, rental_id: params.rental_id});
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
    async uploadProfileImage(@Req() req, @Res() res, @Query() params): Promise<Response> {
        try {
            await this.imagesService.fileuploadAndSave({req, res, category: profile, rental_id: params.rental_id});
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
    async findRentalImages(@Query() params, @Req() req): Promise<RetrievedImagesInterface> {
        return await this.imagesService.findRentalImages({ img_id: null, rental_id: params.rental_id, user: req.user });
    }

    /**
     * Find Rental Image
     * Summary: Find a vehicle image by id
     * @param image the id of the image to find
     */
    @Get('find-rental-image')
    async findRentalImage(@Query() params: ImageDto, @Req() req): Promise<RetrievedImagesInterface> {
        return await this.imagesService.findRentalImages({ img_id: params._id, rental_id: null, user: req.user });
    }

    /**
     * Find Profile Images
     * Summary: Find a user profile image
     * @param req request object
     */
    @Get('find-profile-images')
    async findProfileImages(@Req() req): Promise<RetrievedImagesInterface> {
        return await this.imagesService.findProfileImages({ user: req.user });
    }

    /**
     * Find Profile Image
     * Summary: Find a user profile image
     * @param req request object
     */
    @Get('find-profile-image')
    async findProfileImage(@Req() req, @Body() image: ImageDto): Promise<RetrievedImagesInterface> {
        return await this.imagesService.findProfileImages({ user: req.user, img_id: image._id });
    }

    /**
     * Delete Rental Images
     * Summary: Delete a single or multiple images of a rental
     * @param category both or a single one
     */
    @Post('delete-images')
    async deleteRentalImages(@Body() images: ImageDto[], @Req() req): Promise<DeleteResponseInterface> {
        return await this.imagesService.deleteImages({ images, user: req.user });
    }

    /**
     * Delete all Rental Images
     * Summary: delete all images for a selected rental
     */
    @Post('delete-all-rental-images')
    async deleteAllRentalImages(@Query() params, @Req() req): Promise<DeleteResponseInterface> {
        return await this.imagesService.deleteAllImages({ user: req.user, rental_id: params.rental_id });
    }

    /**
     * Delete All Profile Images
     * Summary: Delete all of the user's profile images
     */
    @Post('delete-all-profile-images')
    async deleteAllProfileImages(@Req() req): Promise<DeleteResponseInterface> {
        return await this.imagesService.deleteAllImages({ user: req.user });
    }

}
