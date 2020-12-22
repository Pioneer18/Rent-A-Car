import { Injectable, Logger, PipeTransform } from '@nestjs/common';
import { RentalSearchFilter } from '../dto/searchRental/given-notice-search-rental-dto';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { RequestCoordinatesDto } from '../dto/searchRental/request-coordinates.dto';
import { RentalDurations } from '../const';
/**
 * **summary**: Create a rental Duration from the incoming RentalSearchFilter
 */
@Injectable()
export class RentalDurationPipe implements PipeTransform {
  constructor(private generateDuration: GenerateRentalDurationEnumUtil) {
    this.generateDuration = generateDuration;
  }

  /**
   * **summary**: Use the generateRentalDurationEnumUtil() to create a RentalDuration [**Enum**](https://www.typescriptlang.org/docs/handbook/enums.html) for the
   * Rental query
   * @param value the semi processed client request data to query a rental near their, or a specified, locaion
   */
  transform = async (value: RentalSearchFilter): Promise<RequestCoordinatesDto> => {
    try {
      let rentalDuration = null;
      if (value.rentalEndTime && value.rentalStartTime) {
        rentalDuration = await this.generateDuration.generateRentalDurationEnum({
          startTime: value.rentalStartTime,
          endTime: value.rentalEndTime,
        });
      }
      const dto: RequestCoordinatesDto = {
        address: value.address,
        price: value.price ? value.price : null,
        features: value.features ? value.features : null,
        rentalDuration,
        givenNotice: rentalDuration !== null ? value.givenNotice : null,
        radius: value.radius
      };
      return await dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
