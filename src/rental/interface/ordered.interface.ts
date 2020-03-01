import { Unavailability } from './unavailability.interface';

export interface Ordered {
    y1: Unavailability[];
    y2: Unavailability[] | null;
}
