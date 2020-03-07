export class UpdateUnavailabilityDto {
    rentalId: string;
    year: number;
    start: number;
    end: number;
    minDoy: number;
    maxDoy: number;
    title: string; // for indexing
    // update time
    updateStart: number;
    updateEnd: number;
}
