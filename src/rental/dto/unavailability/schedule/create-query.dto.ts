/**
 * **summary**: this dto is passed to the ProcessUnavailabilityPipe.createQuery() method to veryify the
 * request to schedule Unavailability for the rental will not overlap with already scheduled Unavailability for the rental
 */
import { UnavailabilityDto } from '../unavailability.dto';

export class CreateQueryDto {
    min: UnavailabilityDto;
    max: UnavailabilityDto;
    year: number;
    start: number;
    end: number;
}
