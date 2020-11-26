/**
 * summary: the mongoose update object created by the CreateUpdaterDtoPipe, it's the data to update an Unavailability for a rental
 * - passed to the rental.service.updateUnavailability() method
 */
export class UpdateUnavailabilityDataDto {
    filter: {
        rentalId: string,
        unavailabilityId: string,
    };
    updater: {
        $set: {
            start: number,
            end: number,
        },
    } | {
        $set: {
            start: number,
            end: number,
            title: string,
        },
    };
}
