import { Injectable, PipeTransform } from '@nestjs/common';
import { PostGivenNoticeDto } from '../dto/post-given-notice.dto';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum';
import { RentalDurationDto } from '../dto/rental-duration.dto';
/**
 * Create a rental Duration from the incoming PostGivenNoticeDto
 */
@Injectable()
export class RentalDurationPipe implements PipeTransform {

    constructor(private generateDuration: GenerateRentalDurationEnumUtil) {
        this.generateDuration = generateDuration;
    }

    async transform(value: PostGivenNoticeDto) {
        try {
            const dto: RentalDurationDto = {
                address: value.address,
                price: value.price,
                features: value.features,
                rentalDuration: await this.generateDuration.generateRentalDurationEnum(value.rentalStartTime, value.rentalEndTime),
                givenNotice: value.givenNotice,
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}