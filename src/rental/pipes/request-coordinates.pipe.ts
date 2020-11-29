import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { RequestCoordinatesDto } from '../dto/searchRental/request-coordinates.dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { SearchRentalDto } from '../dto/searchRental/search-rental.dto';

/**
 * **summary**: Create a SearchRentalDto with the GeoJSON loc property with the [**HERE Geocoding & Searching API**](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html)
 */
@Injectable()
export class RequestCoordinatesPipe implements PipeTransform<any> {
  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) { }

  /**
   * **summary**: Finish transforming the client request into a SearchRentalDto using the geoUrlApiUtil.getCoordinates() method
   * @param value the semi-processed client request data to search for Rentals
   */
  transform = async (value: RequestCoordinatesDto) => {
    const geoUrl = process.env.GEO_URL;
    const apiKey = process.env.GEO_API_KEY;
    try {
      const dto: SearchRentalDto = {
        address: value.address,
        price: value.price,
        features: value.features,
        rentalDuration: value.rentalDuration,
        loc: {
          type: 'Point',
          coordinates: await this.geoUrlApiUtil.getCoordinates({
            address: value.address,
            geoUrl,
            apiKey
          }),
        },
        givenNotice: value.givenNotice,
      };
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }
}
