import { Injectable, PipeTransform } from '@nestjs/common';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove/remove-unavailability.dto';
/**
 * **summary**: validate a client request to remove (unschedule) Unavailability from a Rental
 */
@Injectable()
export class ValidateRemoveUnavailabilityPipe implements PipeTransform {
    /**
     * **summary**: check the request has a valid rentalId and unavailabilityId
     * @param value the raw client request to remove Unavailability from a Rental
     */
    private validateDto = (value: RemoveUnavailabilityDto) => {
        if (typeof value.rentalId !== 'string') {
            throw new Error('invalid rental ID; must be a string');
        }
        if (typeof value.unavailabilityId !== 'string') {
            throw new Error('invalid unavailability ID; must be a string');
        }
    }
    /**
     * **summary**: use the validateDto method to validate the request before passing it on
     * @param value the raw client request
     */
    transform(value: RemoveUnavailabilityDto):RemoveUnavailabilityDto {
        this.validateDto(value);
        return value;
    }
}
