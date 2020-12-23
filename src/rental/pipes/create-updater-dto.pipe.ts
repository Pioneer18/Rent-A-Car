import { Injectable, PipeTransform } from '@nestjs/common';
import { RawUpdateUnavailabilityDto } from '../dto/unavailability/update/raw-update-unavailability.dto';
import {EditUnavailabilityTimeInterface } from '../interface/service/edit-unavailability-time.interface';
/**
 * **summary**: Transforms incoming data into the RawUnavailabilityDto, then passes it to the rental.service.editUnavailabilityTime() method
 */
@Injectable()
export class CreateUpdaterDtoPipe implements PipeTransform<RawUpdateUnavailabilityDto, Promise<EditUnavailabilityTimeInterface>> {

    /**
     * **summary**: This funciton creates the filter to find the unavailability and adds a new start or end time for the unavailability
     * @param value client request to edit unavailability
     */
    private createUpdateData = async (value: RawUpdateUnavailabilityDto): Promise<EditUnavailabilityTimeInterface> => {
        const filter = {
            rentalId: value.rentalId,
            unavailabilityId: value.unavailabilityId,
        };
        // create the updater
        const updater = {
            start: value.newStartTime ? value.newStartTime : null,
            end: value.newEndTime ? value.newEndTime : null,
            title: value.newTitle ? value.newTitle : null,
        };
        console.log(`Edit Unavailability Filter: ${filter}`)
        console.log(`Edit Unavailability Updater: ${updater}`)
        return {filter, updater: updater};
    }

    /**
     * **summary**: Use the private methods to return a EditUnavailabilityTimeInterface
     * @param value client request to edit unavailability
     */
    transform = async (value: RawUpdateUnavailabilityDto): Promise<EditUnavailabilityTimeInterface> => {
        // return an EditUnavailabilityTimeInterface
        const data = await this.createUpdateData(value);
        return data;
    }
}
