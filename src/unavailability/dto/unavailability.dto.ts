import { UnavailabilityInterface } from '../interface/unavailability.interface'

/**
 * **summary**: This dto is used to schedule a block of unavilable time for the rental on a given day and year. A user may schedule up to a year in the future so the specific "year" and "day of the year" is required
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class UnavailabilityDto implements UnavailabilityInterface {
    rentalId: string;
    startDate: Date;
    endDate:Date;
    startTime: number; // min: 0; max: 24
    endTime: number; // min: 0; max: 24
    title: string;
}
