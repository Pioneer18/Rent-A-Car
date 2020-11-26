import { UnavailabilityDto } from '../../dto/unavailability/unavailability.dto';
/**
 * summary: this data is the now validated UnavailabilityDto that will be used to create the final dto to be passed to
 * the rental.service.scheduleUnavailability() method
 * - passed to the ProcessUnavailabilityPipe, the last pipe before the rental.service.scheduleUnavailability() handler method
 */
export class ValidatedUnavailabilityDto {
    y1: UnavailabilityDto[];
    y2: UnavailabilityDto[] | null;
    validated: string;
}