import { Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class ImagesService {

    // build an upload document for the selected directory
    private upload = (directory) => {
        //
    }

    async uploadRentalImages(@Req() req, @Res() res) {
        // upload to aws s3 bucket
    }
}
