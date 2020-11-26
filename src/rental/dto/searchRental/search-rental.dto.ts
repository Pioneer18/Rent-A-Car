/**
 * summary: this dto is the final form of the request to search for a rental. It includes the givenNotice,
 * the rentalDuration, and the GeoJSON loc property
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
