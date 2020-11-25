import { UnavailabilityDto } from '../unavailability.dto';

export class CreateQueryDto {
    min: UnavailabilityDto;
    max: UnavailabilityDto;
    year: number;
    start: number;
    end: number;
}
