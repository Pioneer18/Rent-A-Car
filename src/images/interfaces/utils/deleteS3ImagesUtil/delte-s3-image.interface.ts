import { JwtPayloadInterface } from "src/auth/interfaces/jwt-payload.interface";
import { ImageDto } from "src/images/dto/image.dto";
import { UserInterface } from "src/user/interface/modelInterface/user.interface";

export interface DeleteS3ImageInterface {
    images: ImageDto[];
    user: JwtPayloadInterface;
}