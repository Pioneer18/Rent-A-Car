import { UnavailabilityDto } from '../unavailability.dto';
/**
 * **summary**: This dto is passed to the ProcessUnavailabilityPipe.createQuery() method to veryify the
 * request to schedule Unavailability for the rental will not overlap with already scheduled Unavailability for the rental
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class CreateQueryDto {
    min: UnavailabilityDto;
    max: UnavailabilityDto;
    year: number;
    start: number;
    end: number;
}
