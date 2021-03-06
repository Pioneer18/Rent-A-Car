import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { RawCoordinatesDto } from '../dto/createRental/raw-coordinates.dto';
import { GetCoordinatesInterface } from '../interface/utils/geoUrlApi/get-coordinates.interface';
import { MakeRequestInterface } from '../interface/utils/geoUrlApi/make-request.interface';
import { ApiResponseData } from '../interface/utils/geoUrlApi/api-response-data';

/**
 * **summary**: use [**Geocoding & Search API**](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html) to get coordinates for an address
 * - [Respose Object] = response.data.items[0]
 *  - .title: the complete address as a string
 *  - .address the complete address as an object
 *  - .position: {lat: number, lng: number}
 *  - .mapView: {west: -number, south: number, east: -number, north: number}
 * @param {string} address the address to request coordinates for
 * @param {string} geoUrl base url of the Geocoding and Search geocoding request
 * @param {string} apiKey Geocoding and Search v7 API Key
 *
 */
@Injectable()
export class GeoUrlApiUtil {
  /**
   * Send Geocoding & Search API request
   * @param location the address string
   * @param geoUrl the base HERE geocoding and search v7 api url
   * @param apiKey the api key
   */
  private makeRequest = async (data: MakeRequestInterface): Promise<ApiResponseData> => {
    try {
      const request: any = await axios.default.get(
        `${data.geoUrl}?q=${data.location}&apiKey=${data.apiKey}`,
      );
      return request.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * **summary**: returns an address as a single string, and the corresponding coordinates
   * @param address replace the spaces in the address with + symbols for the api request
   * @param geoUrl the url for the api
   * @param apiKey the key for the api
   */
  getCoordinates = async (data: GetCoordinatesInterface): Promise<[number, number]> => {
    try {
      const location: string = data.address.replace(/\s+/g, '+');
      // make the API request
      console.log('location before the request');
      console.log(location);
      const response: any = await this.makeRequest({
        location,
        geoUrl: data.geoUrl,
        apiKey: data.apiKey,
      });
      // grab the coordinates
      const rawCoordinates: RawCoordinatesDto =
        response.items[0].position;
      // map the coords object to return
      const coords: [number, number] = [
        rawCoordinates.lat,
        rawCoordinates.lng,
      ];
      return coords;
    } catch (err) {
      throw new Error(err);
    }
  }
}
