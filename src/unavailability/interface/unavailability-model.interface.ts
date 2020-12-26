import { DateTime } from 'luxon';
import * as mongoose from 'mongoose';
/**
 * **summary**: Interface for the Unavailability Model. The **startTime** and **endTime** properties are in 
 * The **startDate** and **endDate** are string dates that conform to the following formats:
 * - December 18, 2020 03:24:00
 * - 2020-12-18T03:24:00
 * - 628021800000 (epoch timestamp)
 * The **StartTime** and **endTime** are in militarty time; from 0 - 24
 */
export interface UnavailabilityModelInterface extends mongoose.Document {
    rentalId: string;
    startDate: string | DateTime;
    endDate: string | DateTime;
    startTime: number; // min: 0; max: 24
    endTime: number; // min: 0; max: 24
    title: string; 
}
