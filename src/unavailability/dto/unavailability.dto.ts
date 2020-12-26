import { UnavailabilityInterface } from '../interface/unavailability.interface'

/**
 * **summary**: This dto conatins the details of an Unavailability Document.
 * The **startDate** and **endDate** are string dates that conform to the following formats:
 * - December 18, 2020 03:24:00
 * - 2020-12-18T03:24:00
 * - 628021800000 (epoch timestamp)
 * The **StartTime** and **endTime** are in militarty time; from 0 - 24
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class UnavailabilityDto implements UnavailabilityInterface {
    rentalId: string;
    startDate: string;
    endDate: string;
    startTime: number; // min: 0; max: 24
    endTime: number; // min: 0; max: 24
    title: string;
}
