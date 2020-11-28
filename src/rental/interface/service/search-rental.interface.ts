/**
 * **summary**: Interface for the rental.service.searchRental() method
 */
export interface SearchRentalInterface {
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