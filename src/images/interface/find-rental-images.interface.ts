import { JwtPayloadInterface } from "src/auth/interfaces/jwt-payload.interface";
/**
 * **summary**: Interface for the image.service.findRentalImages() method
 */
export interface FindRentalImagesInterface {
    img_id: string | null;
    rental_id: string | null;
    user: JwtPayloadInterface

}