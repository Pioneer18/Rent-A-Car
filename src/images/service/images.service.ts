/**
 * Save Images
 */
import { Injectable} from '@nestjs/common';

@Injectable()
export class ImagesService {

  // incoming files will always be in an array
  // map the files and upload them to the database
  async saveVehicleImages (files: [any]) {
    console.log(files);
    // map the files
    files.map((item) => ({
      /**
       * for each item grab;
       * - originalname
       * - mimetype
       * - buffer (main data)
       * - size
       * - userId (ref)
       */
    }))
    return files;
  }
}
