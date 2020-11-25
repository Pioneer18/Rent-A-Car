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
