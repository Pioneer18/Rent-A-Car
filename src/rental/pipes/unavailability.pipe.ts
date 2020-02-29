import { Injectable, PipeTransform, Logger } from "@nestjs/common";
import { DateTime, Interval } from 'luxon';
/**
 * validate start is before the end
 * create a Luxon Interval from the incoming request
 * return the interval to the endpoint
 */
@Injectable()
export class UnavailabilityPipe implements PipeTransform {
    transform(value) {

        // convert to Date Time
        const dt = DateTime.fromISO(new Date().toISOString());
        const start = DateTime.fromISO(new Date(value.start).toISOString());
        const end = DateTime.fromISO(new Date(value.end).toISOString());

        // validate the start is before the end
        if (start > end) { throw new Error('Start date & time must be before the end date and time'); }
        // validate the start time is after the current time
        if (start < dt) { throw new Error('Start date cannot be in the past'); }

        // create a Luxon Interval from the incoming request
        const interval = Interval.fromDateTimes(start, end);
        const request /*LuxonUnavailabilityDto*/ = {
            vehicle: value.vehicle,
            interval,
            start: new Date(value.start).toISOString(),
            end: new Date(value.end).toISOString(),
        };

        Logger.log(`Example new Date(): ${new Date()}`);
        Logger.log(`Example ISOString Date: ${new Date().toISOString()}`);

        Logger.log(`the request sent to the endpoint`);
        Logger.log(typeof(request.interval.start.toISO()));

        return request;
    }
}