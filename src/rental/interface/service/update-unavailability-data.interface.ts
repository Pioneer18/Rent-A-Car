/**
 * **summary**: Interface for the rental.service.updateUnavailability() method
 */
export interface UpdateUnavailabilityDataInterface {
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
