/**
 * **summary**:  This dto is used to generate a RentalDuration Enum to represent this rentals scheduled duration; i.e. days, weeks, months. Returned by the GenerateRentalDurationEnumUtil.processRentalTime() method
 */
export class ProcessRentalTimeDto {
    months: number;
    weeks: number;
    days: number;
}