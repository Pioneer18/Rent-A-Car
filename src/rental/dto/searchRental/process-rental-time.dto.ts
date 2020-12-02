/**
 * **summary**:  This dto is used to generate a RentalDuration Enum to represent this rentals scheduled duration; i.e. days, weeks, months. Returned by the GenerateRentalDurationEnumUtil.processRentalTime() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ProcessRentalTimeDto {
    months: number;
    weeks: number;
    days: number;
}