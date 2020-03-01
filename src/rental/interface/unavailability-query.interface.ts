export interface UnavailabilityQuery {
    rentalId: string;
    year: number;
    doy: {$lte: number, $gte: number};
    start: { $gte: number, $lte: number};
    end: {$lte: number, $gte: number};
}
