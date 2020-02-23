import { Injectable, ArgumentMetadata, Logger } from '@nestjs/common';
import { CreateRentalDto } from '../dto/create-rental-dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';

/**
 * Requests coordinates from the incoming CreateRentalDto data and returns
 * the original value, a single string address, and coordinates
 */
@Injectable()
export class GeoUrlApiPipe {

  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {
  }

  private async createAddress(value) {
    // create address string from incoming vehicle.address document
    const address: string = `${value.location.street} ${value.location.city} ${value.location.zip}`;
    return address;
  }

  private async getCoordinates(address: string, geoUrl: string, appId: string, appCode: string) {
    Logger.log(`geoUrl: ${process.env.GEO_URL}`);
    const coords = await this.geoUrlApiUtil.getCoordinates(address, geoUrl, appId, appCode);
    return coords;
  }

  async transform(value: CreateRentalDto) {
    const appId = process.env.GEO_ID;
    const appCode = process.env.GEO_CODE;
    const geoUrl = process.env.GEO_URL;
    try {
      // create the address
      const address = await this.createAddress(value);
      // request the coordinates from the API
      const coords = await this.getCoordinates(address, geoUrl, appId, appCode);
      return { value, coords, address };
    } catch (err) {
      throw new Error(err);
    }
  }
}
