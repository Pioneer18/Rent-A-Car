import { Unavailability } from './unavailability.interface';
import { MTime } from '../alias/military-time.alias';

export interface Processed {
  y1: {
    min: Unavailability;
    max: Unavailability;
    year: number;
    start: MTime;
    end: MTime;
    data: Unavailability[];
  };
  y2: {
    min: Unavailability;
    max: Unavailability;
    year: number;
    start: MTime;
    end: MTime;
    data: Unavailability[];
  } | null;
}
