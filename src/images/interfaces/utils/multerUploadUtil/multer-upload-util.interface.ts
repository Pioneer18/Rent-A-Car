import * as multer from 'multer';
import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
import { SaveImagesInterface } from '../../service/save-images.interface';

export interface MulterUploadUtilInterface {
    req: any;
    res: any;
    multerUpload: multer;
    saveImages: (data: SaveImagesInterface) => {};
    category: string;
    user: JwtPayloadInterface;
    rental_id: string | null;
}