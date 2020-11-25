import { Injectable, PipeTransform } from '@nestjs/common';
import { MapNewRentalPipeInterface } from '../interface/map-new-rental-pipe.interface';
import { CreateRentalDto } from '../dto/crud/create-rental.dto';

@Injectable()
export class MapNewRentalPipe implements PipeTransform {
  async transform(value: MapNewRentalPipeInterface) {
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
