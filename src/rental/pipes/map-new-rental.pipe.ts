import { Injectable, PipeTransform } from '@nestjs/common';
import { LocCreateRentalDto } from '../dto/createRental/loc-create-rental.dto';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';
/**
 * 
 */
@Injectable()
export class MapNewRentalPipe implements PipeTransform {
  async transform(value: LocCreateRentalDto) {
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
