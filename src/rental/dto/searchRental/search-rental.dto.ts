import { SearchRentalInterface } from '../../../rental/interface/service/search-rental.interface';

/**
 * **summary**: This dto is the final form of the request to search for a rental. It includes the givenNotice,
 * the rentalDuration, and the GeoJSON loc property. This dto is passed to the rental.controller.searchRentals method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class SearchRentalDto implements SearchRentalInterface {
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
