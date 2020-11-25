import { Injectable, PipeTransform } from '@nestjs/common';
import { MapRentalDto } from '../dto/crud/map-rental.dto';
import { CreateRentalInterface } from '../interface/create-rental.interface';

@Injectable()
export class MapNewRentalPipe implements PipeTransform {
  async transform(value: MapRentalDto) {
    try {
      const data: CreateRentalInterface = {
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
