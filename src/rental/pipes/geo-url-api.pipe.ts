import { Injectable, ArgumentMetadata, Logger } from '@nestjs/common';
import { AppConfigService } from '../../config/configuration.service';
import { RawCreateRentalDto } from '../dto/createRental/raw-create-rental-dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';

/**
 * Requests coordinates from the incoming CreateRentalDto data and returns
 * the original value, a single string address, and coordinates
 */
@Injectable()
export class GeoUrlApiPipe {
  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil, private readonly appConfig: AppConfigService) {}

  private async createAddress(value) {
    // create address string from incoming vehicle.address document
    const address: string = `${value.location.street} ${value.location.city} ${value.location.zip}`;
    return address;
  }

  async getCoordinates(address: string, geoUrl: string, apiKey: string,
  ) {
    Logger.log(`geoUrl: ${process.env.GEO_URL}`);
    const coords = await this.geoUrlApiUtil.getCoordinates(
      address,
      geoUrl,
     apiKey
    );
    return coords;
  }

  async transform(value: RawCreateRentalDto) {
    const apiKey = process.env.GEO_API_KEY;
    const geoUrl = process.env.GEO_URL;
    try {
      // create the address
      const address = await this.createAddress(value);
      // request the coordinates from the API
      const coords = await this.getCoordinates(address, geoUrl, apiKey);
      return { value, coords, address };
    } catch (err) {
      throw new Error(err);
    }
  }
}
