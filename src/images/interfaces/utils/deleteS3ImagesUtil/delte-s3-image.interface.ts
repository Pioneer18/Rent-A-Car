import { JwtPayloadInterface } from "src/auth/interfaces/jwt-payload.interface";
import { ImageDto } from "src/images/dto/image.dto";
/**
 * **summary**: Interface for the DeleteS3ImagesUtil class' deleteS3Image() and deleteS3Images() methods
 */
export interface DeleteS3ImageInterface {
    images: ImageDto[];
    user: JwtPayloadInterface;
}