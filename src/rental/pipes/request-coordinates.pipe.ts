import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { RequestCoordinatesPipeInterface } from '../interface/request-coordinates-pipe.interface';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { SearchRentalDto } from '../dto/crud/search-rental.dto';

@Injectable()
export class RequestCoordinatesPipe implements PipeTransform<any> {
  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {}

  async transform(value: RequestCoordinatesPipeInterface) {
    const geoUrl = process.env.GEO_URL;
    const apiKey = process.env.GEO_API_KEY; 
    try {
      // Logger.log(`geoUrl: ${geoUrl}`);
      const dto: SearchRentalDto = {
        address: value.address,
        price: value.price,
        features: value.features,
        rentalDuration: value.rentalDuration,
        loc: {
          type: 'Point',
          coordinates: await this.geoUrlApiUtil.getCoordinates(
            value.address,
            geoUrl,
            apiKey
          ),
        },
        givenNotice: value.givenNotice,
      };
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
