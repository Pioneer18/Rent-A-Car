import { Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from '../../config/configuration.service';
import { LocCreateRentalDto } from '../dto/createRental/loc-create-rental.dto';
import { RawCreateRentalDto } from '../dto/createRental/raw-create-rental-dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';

/**
 * **summary**: Create an address from the incoming RawCreateRentalDto and then use the [**HERE Geocoding & Searching API**](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html)
 * to get the coordinates of the address. The coordinates allow Rentals to be geospatially queried in a radius near a user or selected location; e.g. 8 mile radius
 */
@Injectable()
export class GeoUrlApiPipe {
  constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) { }

  /**
   * **summary**: Convert the location property object into a single address property string; will be passed to this.getCoordinates method
   * @param value the raw form data inputed by user to create a new Rental listing
   */
  private createAddress = async (value): Promise<string> => {
    // create address string from incoming vehicle.address document
    const address: string = `${value.location.street} ${value.location.city} ${value.location.zip}`;
    return address;
  }

  /**
   * **summary**: Request coordinates for the provided address
   * @param address the address to fetch coordinates for from the API
   * @param geoUrl the url for accessing the API
   * @param apiKey the key for accessing the API
   */
  private getCoordinates = async (address: string, geoUrl: string, apiKey: string,
  ): Promise<[number, number]> => {
    Logger.log(`geoUrl: ${process.env.GEO_URL}`);
    const coords = await this.geoUrlApiUtil.getCoordinates({
      address,
      geoUrl,
      apiKey,
    });
    return coords;
  }

  /**
   * **summary**: Use the createAddress() and getCoordinates() methods to return the request data with coordinates and an address string
   * @param value The raw request from a client to create a new Rental listing
   */
  transform = async (value: RawCreateRentalDto): Promise<LocCreateRentalDto> => {
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
