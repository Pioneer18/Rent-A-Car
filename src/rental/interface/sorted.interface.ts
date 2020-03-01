import { Unavailability } from './unavailability.interface';

export interface Sorted {
    yA: Unavailability[];
    yB: Unavailability[] | null;
}
