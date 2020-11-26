/**
 * **summary**: search for retnals by address, a start and end time, price, and features
 * - passed to the GivenNoticePipe
 */
export class RawSearchRentalDto {
    address: string;
    rentalStartTime: Date;
    rentalEndTime: Date;
    price: number;
    features: string[];
}
