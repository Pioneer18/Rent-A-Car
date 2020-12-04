import { JwtPayloadInterface } from '../../../auth/interfaces/jwt-payload.interface';
/**
 * **summary**: Interface for the image.service.findProfileImage() method
 */
export interface FindProfileImageInterface {
    user: JwtPayloadInterface;
    img_id?: string; // for selecting a specific image
}
