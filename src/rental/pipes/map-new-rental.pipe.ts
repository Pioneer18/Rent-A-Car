import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { MapRentalDto } from '../dto/map-rental.dto';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';

@Injectable()
export class MapNewRentalPipe implements PipeTransform {
  async transform(value: MapRentalDto, metadata: ArgumentMetadata) {
    try {
      const data: MappedRentalInterface = {
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
