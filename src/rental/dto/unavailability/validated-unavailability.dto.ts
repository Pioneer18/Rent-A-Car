import { Unavailability } from '../../interface/unavailability.interface';

export class ValidatedUnavailabilityDto {
    y1: Unavailability[];
    y2: Unavailability[] | null;
    validated: string;
}
