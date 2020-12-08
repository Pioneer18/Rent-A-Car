import { Injectable, Logger, PipeTransform } from '@nestjs/common';
import { GivenNoticeSearchRentalDto } from '../dto/searchRental/given-notice-search-rental-dto';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { RequestCoordinatesDto } from '../dto/searchRental/request-coordinates.dto';
/**
 * **summary**: Create a rental Duration from the incoming GivenNoticeSearchRentalDto
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
  transform = async (value: GivenNoticeSearchRentalDto): Promise<RequestCoordinatesDto> => {
    try {
      const dto: RequestCoordinatesDto = {
        address: value.address,
        price: value.price,
        features: value.features,
        rentalDuration: await this.generateDuration.generateRentalDurationEnum(
          {
            startTime: value.rentalStartTime,
            endTime: value.rentalEndTime,
          },
        ),
        givenNotice: value.givenNotice,
      };
      Logger.log('RENTAL DURATION PIPE: RETURN DTO')
      Logger.log(dto);
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
