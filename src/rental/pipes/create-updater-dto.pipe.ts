import { Injectable, Logger, PipeTransform } from '@nestjs/common';
import { UpdateUnavailabilityDto } from '../dto/unavailability/update/update-unavailability.dto';
import { RawUpdateUnavailabilityDto } from '../dto/unavailability/update/raw-update-unavailability.dto';
import { UpdateUnavailabilityDataInterface } from '../interface/service/update-unavailability-data.interface';
/**
 * **summary**: Transforms incoming data into the UpdateUnavailabilityDto, then passes it to the rental.service.editUnavailabilityTime() method
 */
@Injectable()
export class CreateUpdaterDtoPipe implements PipeTransform<RawUpdateUnavailabilityDto, Promise<UpdateUnavailabilityDataInterface>> {

    /**
     * **summary**: Extends the start day or end day of the unavailability
     * This method will add or reduce documents from the unavailability group as necessary. 
     * @param 
     */

    /**
     * **summary**: Reduces the start day or end day of the unavailability
     * This method will add or reduce documents from the unavailability group as necessary. 
     * @param 
     */

    /**
     * **summary**: 
     * - create the filter to find the unavailability
     * - add a new start or end time for the unavailability
     * - extend the endTime if available or reduce the endTime
     * - extend the startTime if available or reduce the startTime
     * @param value UpdateUnavailabilityDto
     */
    private createUpdateData = async (value: RawUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDataInterface> => {
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
        return {filter, updater: updater};
    }

    /**
     * **summary**: Use the private methods to return a UpdateUnavailabilityDto
     * @param value a validated UpdateUnavailabilityDto
     */
    transform = async (value: RawUpdateUnavailabilityDto): Promise<UpdateUnavailabilityDataInterface> => {
        // return an UpdateUnavailabilityDto
        const data = await this.createUpdateData(value);
        return data;
    }
}
