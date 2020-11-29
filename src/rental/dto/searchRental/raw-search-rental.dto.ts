/**
 * **summary**: This Dto is to search for retnals by address, a start and end time, price, and features, it is passed to the GivenNoticePipe
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RawSearchRentalDto {
    address: string;
    rentalStartTime: Date;
    rentalEndTime: Date;
    price?: number;
    features?: string[];
}
