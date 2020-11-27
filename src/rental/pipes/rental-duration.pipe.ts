import { Injectable, PipeTransform } from '@nestjs/common';
import { GivenNoticeSearchRentalDto } from '../dto/searchRental/given-notice-search-rental-dto';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { RequestCoordinatesDto } from '../dto/searchRental/request-coordinates.dto';
/**
 * **summary**: create a rental Duration from the incoming GivenNoticeSearchRentalDto
 */
@Injectable()
export class RentalDurationPipe implements PipeTransform {
  constructor(private generateDuration: GenerateRentalDurationEnumUtil) {
    this.generateDuration = generateDuration;
  }

  /**
   * **summary**: use the generateRentalDurationEnumUtil() to create a RentalDuration [**Enum**](https://www.typescriptlang.org/docs/handbook/enums.html) for the
   * Rental query
   * @param value the semi processed client request data to query a rental near their, or a specified, locaion
   */
  transform = async(value: GivenNoticeSearchRentalDto) => {
    try {
      const dto: RequestCoordinatesDto = {
        address: value.address,
        price: value.price,
        features: value.features,
        rentalDuration: await this.generateDuration.generateRentalDurationEnum(
          value.rentalStartTime,
          value.rentalEndTime,
        ),
        givenNotice: value.givenNotice,
      };
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
