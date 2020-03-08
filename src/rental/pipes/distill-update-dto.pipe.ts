import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUnavailabilityDto } from '../dto/update-unavailability.dto';
import { ValidateUpdateUnavailabilityDto } from '../dto/validate-update-unavailability.dto';

@Injectable()
export class CreateUpdaterDtoPipe implements PipeTransform<ValidateUpdateUnavailabilityDto, Promise<UpdateUnavailabilityDto>> {

    // return an UpdateUnavailabilityDto
    private distillDto = async (value: ValidateUpdateUnavailabilityDto) => {
        const data: UpdateUnavailabilityDto = {
            unavailabilityId: value.unavailabilityId,
            rentalId: value.rentalId,
            newStart: value.newStart,
            newEnd: value.newEnd,
            newTitle: value.newTitle,
        };
        return data;
    }

    async transform(value: ValidateUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDto> {
        // return an UpdateUnavailabilityDto
        const data =  await this.distillDto(value);
        return data;
    }
}
