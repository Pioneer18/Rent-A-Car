import { Interval } from 'luxon';

export class ScheduleUnavailabilityDto {
  vehicle: string;
  interval: Interval;
  start: string; // ISO String
  end: string; // ISO String
}
