import { Injectable, PipeTransform } from '@nestjs/common';
import { RawGeneratedDurationDto } from '../dto/raw-search-rental.dto';
import { DateTime } from 'luxon';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum';
import { GeneratedDurationDto } from '../dto/generated-duration.dto';
/**
 * Create a rental Duration from the incoming RawGeneratedDurationDto
 */
@Injectable()
export class GenerateRentalDurationPipe implements PipeTransform {

    readonly generateDuration: GenerateRentalDurationEnumUtil;
    constructor(generateDuration: GenerateRentalDurationEnumUtil) {
        this.generateDuration = generateDuration;
    }

    async transform(value: RawGeneratedDurationDto) {
        try {
            const startTime: DateTime = DateTime.fromISO(new Date(value.rentalStartTime).toISOString());
            const endTime: DateTime = DateTime.fromISO(new Date(value.rentalEndTime).toISOString());
            const dto: GeneratedDurationDto = {
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