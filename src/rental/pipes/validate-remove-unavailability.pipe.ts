import { Injectable, PipeTransform } from '@nestjs/common';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove/remove-unavailability.dto';
/**
 * **summary**: Validate a client request to remove (unschedule) Unavailability from a Rental
 */
@Injectable()
export class ValidateRemoveUnavailabilityPipe implements PipeTransform {
    /**
     * **summary**: Check the request has a valid rentalId and unavailabilityId
     * @param value the raw client request to remove Unavailability from a Rental
     */
    private validateDto = (value: RemoveUnavailabilityDto): void => {
        if (typeof value.rentalId !== 'string') {
            throw new Error('invalid rental ID; must be a string');
        }
        if (typeof value.unavailabilityId !== 'string') {
            throw new Error('invalid unavailability ID; must be a string');
        }
    }
    /**
     * **summary**: Use the validateDto method to validate the request before passing it on
     * @param value the raw client request
     */
    transform = (value: RemoveUnavailabilityDto):RemoveUnavailabilityDto => {
        this.validateDto(value);
        return value;
    }
}
