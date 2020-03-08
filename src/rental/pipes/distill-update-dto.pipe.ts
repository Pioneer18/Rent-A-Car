import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUnavailabilityDto } from '../dto/update-unavailability.dto';
import { ValidateUpdateUnavailabilityDto } from '../dto/validate-update-unavailability.dto';

@Injectable()
export class DistillUpdateDtoPipe implements PipeTransform<ValidateUpdateUnavailabilityDto, UpdateUnavailabilityDto> {
    transform(value: ValidateUpdateUnavailabilityDto): UpdateUnavailabilityDto {
        // return an UpdateUnavailabilityDto
        const data: UpdateUnavailabilityDto = {
            unavailabilityId: value.unavailabilityId,
            rentalId: value.rentalId,
            newStart: value.newStart,
            newEnd: value.newEnd,
            newTitle: value.newTitle,
        };
        return data;
    }
}
