import { Unavailability } from './unavailability.interface';

export interface ValidatedUnavailabilityDto {
    y1: Unavailability[];
    y2: Unavailability[];
    validated: string;
}
