import { UnavailabilityDto } from '../../dto/unavailability/unavailability.dto';

export class ValidatedUnavailabilityDto {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
    validated: string;
}
