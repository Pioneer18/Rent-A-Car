/**
 * **summary**: Interface for the rental.service.updateUnavailability() method
 */
export interface UpdateUnavailabilityDataInterface {
    filter: {
        rentalId: string,
        unavailabilityId: string,
    };
    updater: {
            start: number,
            end: number,
            title?: string
    };
}
