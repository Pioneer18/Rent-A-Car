import { Injectable, PipeTransform } from '@nestjs/common';
import { RentalDurationPipeInterface } from '../interface/rental-duration-pipe.interface';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { RequestCoordinatesPipeInterface } from '../interface/request-coordinates-pipe.interface';
/**
 * Create a rental Duration from the incoming RentalDurationPipeInterface
 */
@Injectable()
export class RentalDurationPipe implements PipeTransform {
  constructor(private generateDuration: GenerateRentalDurationEnumUtil) {
    this.generateDuration = generateDuration;
  }

  async transform(value: RentalDurationPipeInterface) {
    try {
      const dto: RequestCoordinatesPipeInterface = {
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
