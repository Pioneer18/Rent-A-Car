export class UpdateUnavailabilityDto {
    rentalId: string;
    year: number;
    start: number;
    end: number;
    title: string; // for indexing
    // update time
    updateStart: number;
    updateEnd: number;
}
