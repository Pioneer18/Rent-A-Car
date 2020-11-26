/**
 * summary: returned by the GenerateRentalDurationEnumUtil.processRentalTime() method
 * - this dto is used to generate a RentalDuration Enum to represent this rentals scheduled duration; i.e. days, weeks, months
 */
export class ProcessRentalTimeDto {
    months: number;
    weeks: number;
    days: number;
}