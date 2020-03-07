import { Unavailability } from './unavailability.interface';

export interface Processed {
    min: Unavailability;
    max: Unavailability;
    year: number;
    start: number;
    end: number;
}
