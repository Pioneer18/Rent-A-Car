import { Unavailability } from '../../interface/unavailability.interface';

export interface ValidatedUnavailabilityDto {
    y1: Unavailability[];
    y2: Unavailability[] | null;
    validated: string;
}
