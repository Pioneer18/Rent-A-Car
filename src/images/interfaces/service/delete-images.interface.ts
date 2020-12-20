import { JwtPayloadInterface } from '../../../auth/interfaces/jwt-payload.interface';
import { ImageDto } from '../../dto/image.dto';
/**
 * **summary**: Interface for the image.service.deleteImages() method
 */
export interface DeleteImagesInterface {
    images: ImageDto[];
    user: JwtPayloadInterface;
}
