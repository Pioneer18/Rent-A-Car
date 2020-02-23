import { Injectable, PipeTransform } from '@nestjs/common';
import { PostGivenNoticeDto } from '../dto/post-given-notice.dto';
import { DateTime } from 'luxon';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum';
import { RentalDurationDto } from '../dto/rental-duration.dto';
/**
 * Create a rental Duration from the incoming PostGivenNoticeDto
 */
@Injectable()
export class RentalDurationPipe implements PipeTransform {

    readonly generateDuration: GenerateRentalDurationEnumUtil;
    constructor(generateDuration: GenerateRentalDurationEnumUtil) {
        this.generateDuration = generateDuration;
    }

    async transform(value: PostGivenNoticeDto) {
        try {
            const startTime: DateTime = DateTime.fromISO(new Date(value.rentalStartTime).toISOString());
            const endTime: DateTime = DateTime.fromISO(new Date(value.rentalEndTime).toISOString());
            const dto: RentalDurationDto = {
                address: value.address,
                features: value.features,
                rentalDuration: await this.generateDuration.generateRentalDurationEnum(startTime, endTime),
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}