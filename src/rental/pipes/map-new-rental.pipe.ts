import { Injectable, PipeTransform } from '@nestjs/common';
import { LocCreateRentalDto } from '../dto/createRental/loc-create-rental.dto';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';
/**
 * **summary**: Create the final CreateRentalDto that will be passed to the rental.service.createRental() method
 */
@Injectable()
export class MapNewRentalPipe implements PipeTransform {
  /**
   * **summary**: Transform the raw data into a CreateRentalDto
   * @param value the request to create a rental with all of the necessary raw data
   */
  transform = async (value: LocCreateRentalDto): Promise<CreateRentalDto> => {
    try {
      const data: CreateRentalDto = {
        rentalDescription: 'this is a tokyo grocery getter',
        address: value.address,
        specs: value.value.specs,
        registration: value.value.registration,
        features: value.value.features,
        scheduling: value.value.scheduling,
        pricing: value.value.pricing,
        loc: {
          type: 'Point',
          coordinates: value.coords,
        },
        photos: value.value.photos,
        listed: value.value.listed,
      };
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
