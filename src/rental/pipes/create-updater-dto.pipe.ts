import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateUnavailabilityDto } from '../dto/unavailability/update/update-unavailability.dto';
import { ValidateUpdateUnavailabilityDto } from '../dto/unavailability/update/validate-update-unavailability.dto';
import { UpdateUnavailabilityDataDto } from '../dto/unavailability/update/update-unavailability-data.dto';
/**
 * **summary**: create the data the request UpdateUnavailabilityDataDto the rental.service.updateUnavailability() method needs
 */
@Injectable()
export class CreateUpdaterDtoPipe implements PipeTransform<ValidateUpdateUnavailabilityDto, Promise<UpdateUnavailabilityDataDto>> {

    /**
     * **summary**: map the ValidateUpdateUnavailabilityDto to a simpler UpdateUnavailabilityDto format
     * @param value ValidateUpdateUnavailabilityDto
     */
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

    /**
     * **summary**: create a MongoDB update object from the UpdateUnavailabilityDto
     * @param value UpdateUnavailabilityDto
     */
    private createUpdateData = async (value: UpdateUnavailabilityDto) => {
        const filter = {
            rentalId: value.rentalId,
            unavailabilityId: value.unavailabilityId,
        };
        if (value.newTitle === null) {
          const updater1 = {
              $set: {
                start: value.newStart,
                end: value.newEnd,
              },
          };
          return {filter, updater: updater1};
        }
        const updater2 = {
            $set: {
                start: value.newStart,
                end: value.newEnd,
                title: value.newTitle,
            },
        };
        return { filter, updater: updater2};
    }

    /**
     * **summary**: use the private methods to return a UpdateUnavailabilityDto
     * @param value a validated UpdateUnavailabilityDto
     */
    async transform(value: ValidateUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDataDto> {
        // return an UpdateUnavailabilityDto
        const raw =  await this.distillDto(value);
        const data = await this.createUpdateData(raw);
        return data;
    }
}
