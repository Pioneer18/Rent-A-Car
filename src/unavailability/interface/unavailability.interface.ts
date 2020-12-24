/**
 * **summary**: Interface for the Unavailability Model. The **startTime** and **endTime** properties are in 
 * military time; 0 - 24
 */
export interface UnavailabilityInterface {
    _id?: string;
    rentalId: string;
    startDate: Date;
    endDate:Date;
    startTime: number; // min: 0; max: 24
    endTime: number; // min: 0; max: 24
    title: string; 
    __v?: number;
}
