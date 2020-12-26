import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UnavailabilityDto } from '../dto/unavailability.dto';
import { UnavailabilityInterface } from '../interface/unavailability.interface';


@Injectable()
export class SchedulingValidationPipe implements PipeTransform {

  /**
   * **summary**: Validate the requested unavailability conforms to the following conditions:
   * - Duration of the Unavailability is less than or equal to a year
   * - Duration of the Unavailability is at least one day
   * - The start Date and Time of the Unavailability is before the end Date and Time
   * @param value 
   */
  private validate = async (value: UnavailabilityDto): Promise<UnavailabilityInterface> => {
    // duration <= year
    if(value) {
      
      throw new Error('')
    }
    // duartion >= 1 day
    if(value) {
      throw new Error('')
    }
    // startDate 
    if(value) {
      throw new Error('')
    }
    return value;
  }

  /**
   * **summary**: Validate the requested Unavailability
   * @param value requested Unavailability
   * @param metadata 
   */
  transform = async (value: UnavailabilityDto, metadata: ArgumentMetadata): Promise<UnavailabilityInterface> => {
    return value;
  }
}
