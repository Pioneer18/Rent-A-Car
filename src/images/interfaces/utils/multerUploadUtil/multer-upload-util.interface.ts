import * as multer from 'multer';
import { JwtPayloadInterface } from '../../../../auth/interfaces/jwt-payload.interface';
import { SaveImagesInterface } from '../../service/save-images.interface';
/**
 * **summary**: Interface for the MulterUploadUtil.upload() method
 */
export interface MulterUploadUtilInterface {
    req: any;
    res: any;
    multerUpload: multer;
    saveImages: (data: SaveImagesInterface) => {};
    category: string;
    user: JwtPayloadInterface;
    rental_id: string | null;
}
