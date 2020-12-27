import { DateTime } from 'luxon';
/**
 * **summary**: Interface for the Unavailability Model. The **startTime** and **endTime** properties are in 
 * The **startDate** and **endDate** are string dates that conform to the following formats:
 * - December 18, 2020 03:24:00
 * - 2020-12-18T03:24:00
 * - 628021800000 (epoch timestamp)
 * The **StartTime** and **endTime** are in militarty time; from 0 - 24
 */
export interface UnavailabilityInterface {
    _id?: string;
    rentalId: string;
    title: string; 
    startDateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        // timeZone: String,
    };
    endDateTime:{
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        // timeZone: String,
    };
    __v?: number;
}
