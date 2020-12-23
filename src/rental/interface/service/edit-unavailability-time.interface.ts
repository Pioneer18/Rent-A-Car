/**
 * **summary**: Interface for the rental.service.editUnavailabilityTime() method
 */
export interface EditUnavailabilityTimeInterface {
    filter: {
        rentalId: string,
        unavailabilityId: string,
    };
    updater: {
            start?: number, // time
            end?: number, // time
            title?: string
    };
}
