import { Injectable, PipeTransform } from '@nestjs/common';
import { RawGeneratedDurationDto } from '../dto/raw-search-rental.dto';
import { DateTime } from 'luxon';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum';
import { GeneratedDurationDto } from '../dto/generated-duration.dto';
/**
 * Create a rental Duration from the incoming SearchVehicleDto
 */
@Injectable()
export class GenerateRentalDurationPipe implements PipeTransform {

    readonly generateDuration: GenerateRentalDurationEnumUtil;
    constructor(generateDuration: GenerateRentalDurationEnumUtil) {
        this.generateDuration = generateDuration;
    }

    async transform(value: RawGeneratedDurationDto) {
        try {
            const temp: any = value;
            const rentalStartTime: DateTime = DateTime.fromISO(new Date(value.rentalStartTime).toISOString());
            const rentalEndTime: DateTime = DateTime.fromISO(new Date(value.rentalEndTime).toISOString());
            temp.rentalDuration = await this.generateDuration.generateRentalDurationEnum(rentalStartTime, rentalEndTime);
            const dto: GeneratedDurationDto = temp;
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}