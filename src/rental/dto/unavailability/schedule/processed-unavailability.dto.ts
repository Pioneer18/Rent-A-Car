import { UnavailabilityQueryDto } from './unavailability-query.dto';
import { ProcessedUnavailabilityQueryDto } from './processed-unavailability-query.dto';
import { ScheduleUnavailabilityInterface } from '../../../interface/service/schedule-unavailability.interface';
/**
 * **summary**: This dto is the final procesed version of the request to schedule unavailability. It contains the UnavailabilityQueryDto data that was used
 * to create the ProcessedUnavailabilityQueryDtos as well as the returned ProcessedUnavailabilityQueryDto[]s that will be used by the handler
 * to schedule the new unavailability. It is passed to the rental.controller.scheduleUnavailability() method
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class ProcessedUnavailabilityDto implements ScheduleUnavailabilityInterface {
    y1Query: UnavailabilityQueryDto;
    y2Query: UnavailabilityQueryDto | null;
    data: {
        y1: ProcessedUnavailabilityQueryDto[];
        y2: ProcessedUnavailabilityQueryDto[] | null;
    };
}
