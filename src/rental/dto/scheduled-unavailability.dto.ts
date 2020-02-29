import { Interval } from 'luxon';

export class ScheduleUnavailabilityDto {
  rentalId: string;
  unavailability: [ {
    year: number;
    doy: number; // day of the year
    interval: {
      start: number; // min: 0; max: 24 military time
      end: number; // min: 0; max: 24 military time
    };
    title: string; // e.g. Christmas Break
  } ];
}
