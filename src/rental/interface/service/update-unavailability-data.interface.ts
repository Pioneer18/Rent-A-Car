/**
 * **summary**: Interface for the rental.service.updateUnavailability() method
 */
export interface UpdateUnavailabilityDataInterface {
    filter: {
        rentalId: string,
        unavailabilityId: string,
    };
    updater: {
            start: number, // time
            end: number, // time
            // startDay: number, function must generate the new documents
            // endDay: number, function must generate the new documents
            title?: string
    };
}
