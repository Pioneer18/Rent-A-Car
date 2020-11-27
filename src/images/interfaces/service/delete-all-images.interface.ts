import { JwtPayloadInterface } from "src/auth/interfaces/jwt-payload.interface";

export interface DeleteAllImagesInterface {
    user: JwtPayloadInterface;
    rental_id?: string;
}