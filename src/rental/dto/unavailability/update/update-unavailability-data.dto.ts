import { UpdateUnavailabilityDataInterface } from '../../../interface/service/update-unavailability-data.interface';
/**
 * **summary**: the mongoose update object created by the CreateUpdaterDtoPipe, it's the data to update an Unavailability for a rental. It's passed to the rental.controller.updateUnavailability() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class UpdateUnavailabilityDataDto implements UpdateUnavailabilityDataInterface {
    filter: {
        rentalId: string,
        unavailabilityId: string,
    };
    updater: {
            start: number,
            end: number,
    } | {
            start: number,
            end: number,
            title: string,
    };
}
