export interface ProcessedUnavailabilityInterface {
    unavailabilityId: string; // for updating and quick indexing
    rentalId: string;
    year: number;
    doy: number;
    start: number;
    end: number;
    title: string;
}