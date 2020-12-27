/**
 * **summary**: Interface for the Unavailability Model
export interface UnavailabilityInterface {
    _id?: string;
    title: string; // e.g. Christmas
    rentalId: string;
    startDateTime: {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        // timeZone: String,
    }
    endDateTime:{
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        // timeZone: String,
    }
    __v?: number;
}
*/