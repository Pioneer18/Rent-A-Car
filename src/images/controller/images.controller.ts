import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImagesService } from '../service/images.service';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}
    @Post('rentals')
    async uploadRentalImages(@Req() req, @Res() res) {
        return 'tee-hee';
    }
}
