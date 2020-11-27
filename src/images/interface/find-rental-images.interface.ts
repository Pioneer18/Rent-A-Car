import { JwtPayloadInterface } from "src/auth/interfaces/jwt-payload.interface";

export interface FindRentalImagesInterface {
    img_id: string | null;
    rental_id: string | null;
    user: JwtPayloadInterface

}