import { Injectable, Logger, PipeTransform } from '@nestjs/common';
import { UpdateUnavailabilityDto } from '../dto/unavailability/update/update-unavailability.dto';
import { RawUpdateUnavailabilityDto } from '../dto/unavailability/update/raw-update-unavailability.dto';
import { UpdateUnavailabilityDataInterface } from '../interface/service/update-unavailability-data.interface';
/**
 * **summary**: Transforms incoming data into the UpdateUnavailabilityDto, then passes it to the rental.service.updateUnavailability() method
 */
@Injectable()
export class CreateUpdaterDtoPipe implements PipeTransform<RawUpdateUnavailabilityDto, Promise<UpdateUnavailabilityDataInterface>> {

    /**
     * **summary**: Map the RawUpdateUnavailabilityDto to a simpler UpdateUnavailabilityDto format
     * @param value RawUpdateUnavailabilityDto
     */
    private distillDto = async (value: RawUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDto> => {
        const data: UpdateUnavailabilityDto = {
            unavailabilityId: value.unavailabilityId,
            rentalId: value.rentalId,
            newStart: value.newStartTime,
            newEnd: value.newEndTime,
            newTitle: value.newTitle,
        };
        return data;
    }

    /**
     * **summary**: Create a MongoDB update object from the UpdateUnavailabilityDto
     * @param value UpdateUnavailabilityDto
     */
    private createUpdateData = async (value: UpdateUnavailabilityDto): Promise<UpdateUnavailabilityDataInterface> => {
        const filter = {
            rentalId: value.rentalId,
            unavailabilityId: value.unavailabilityId,
        };
        if (value.newTitle === null) {
          const updater1 = {
                start: value.newStart,
                end: value.newEnd,
          };
          return {filter, updater: updater1};
        }
        const updater2 = {
                start: value.newStart,
                end: value.newEnd,
                title: value.newTitle,
        };
        return { filter, updater: updater2};
    }

    /**
     * **summary**: Use the private methods to return a UpdateUnavailabilityDto
     * @param value a validated UpdateUnavailabilityDto
     */
    transform = async (value: RawUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDataInterface> => {
        // return an UpdateUnavailabilityDto
        const raw =  await this.distillDto(value);
        const data = await this.createUpdateData(raw);
        return data;
    }
}
