import { Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateRentalDto } from '../dto/create-rental-dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';

/**
 * Requests coordinates from the incoming CreateRentalDto data and returns
 * the original value, a single string address, and coordinates
 */
@Injectable()
export class GeoUrlApiPipe {
  // initialize the arguments for accessing the API
  private readonly appId: string;
  private readonly appCode: string;
  private readonly geoUrl: string;

  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {
    this.appId = process.env.GEO_ID;
    this.appCode = process.env.GEO_CODE;
    this.geoUrl = process.env.GEO_URL;
  }

  async createAddress(value) {
    // create address string from incoming vehicle.address document
    const address: string = `${value.location.street} ${value.location.city} ${value.location.zip}`;
    return address;
  }

  async getCoordinates(address, appCode, appId, geoUrl) {
    const coords = await this.geoUrlApiUtil.getCoordinates(address, appCode, appId, geoUrl);
    return coords;
  }

  async transform(value: CreateRentalDto) {
    try {
      // create the address
      const address = await this.createAddress(value);
      // request the coordinates from the API
      const coords = await this.getCoordinates(address, this.appCode, this.appId, this.geoUrl);
      return { value, coords, address };
    } catch (err) {
      throw new Error(err);
    }
  }
}
