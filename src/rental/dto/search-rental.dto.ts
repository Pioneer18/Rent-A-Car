/**
 * Final Search Rental DTO
 */
export class SearchRentalDto {
    address: string;
    features: [string];
    rentalDuration: number;
    loc: {
        type: 'Point'
        coordinates: [number, number];
    };
    givenNotice: number;
}