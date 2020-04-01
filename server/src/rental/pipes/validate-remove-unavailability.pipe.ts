import { Injectable, PipeTransform } from '@nestjs/common';
import { RemoveUnavailabilityDto } from '../dto/remove-unavailability.dto';

@Injectable()
export class ValidateRemoveUnavailabilityPipe implements PipeTransform {
    private validateDto = (value: RemoveUnavailabilityDto) => {
        if (typeof value.rentalId !== 'string') {
            throw new Error('invalid rental ID; must be a string');
        }
        if (typeof value.unavailabilityId !== 'string') {
            throw new Error('invalid unavailability ID; must be a string');
        }
    }
    transform(value) {
        // validate stuffs
        this.validateDto(value);
        return value;
    }
}
