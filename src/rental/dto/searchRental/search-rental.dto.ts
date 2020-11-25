/**
 * summary: used to query rentals
 * - passed to the rental.service.searchRentals method
 */
export class SearchRentalDto {
    address: string;
    price: number;
    features: string[];
    rentalDuration: number;
    loc: {
        type: 'Point'
        coordinates: [number, number];
    };
    givenNotice: number;
}
