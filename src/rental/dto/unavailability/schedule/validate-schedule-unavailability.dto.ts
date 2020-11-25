import { UnavailabilityDto } from '../unavailability.dto';

export class ValidateScheduleUnavailabilityDto {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
}
