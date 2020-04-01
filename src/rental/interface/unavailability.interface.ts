import { MTime } from '../alias/military-time.alias';

export interface Unavailability {
    rentalId: string;
    year: number;
    doy: number;
    start: number;
    end: number;
    title: string;
}
