/**
 * Final Search Rental DTO
 */
export class SearchRentalDto {
    address: string;
    price: number;
    features: [string];
    rentalDuration: number;
    loc: {
        type: 'Point'
        coordinates: [number, number];
    };
    givenNotice: number;
}