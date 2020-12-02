import { JwtPayloadInterface } from 'src/auth/interfaces/jwt-payload.interface';
/**
 * **summary**: Interface for the images.service.deleteAllImages() method
 */
export interface DeleteAllImagesInterface {
    user: JwtPayloadInterface;
    rental_id?: string;
}
