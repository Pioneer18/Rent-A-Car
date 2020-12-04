import { JwtPayloadInterface } from '../../../../auth/interfaces/jwt-payload.interface';
import { ImageDto } from '../../../../images/dto/image.dto';
/**
 * **summary**: Interface for the DeleteS3ImagesUtil class' deleteS3Image() and deleteS3Images() methods
 */
export interface DeleteS3ImageInterface {
    images: ImageDto[];
    user: JwtPayloadInterface;
}
