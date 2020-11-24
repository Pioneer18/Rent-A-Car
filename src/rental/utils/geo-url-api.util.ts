import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

/**
 * @param {string} address the address to request coordinates for
 * @param {string} geoUrl base url of the Geocoder API
 * @param {string} apiKey 
 */
@Injectable()
export class GeoUrlApiUtil {
  private async makeRequest(location, geoUrl, apiKey) {
    try {
      const request: any = await axios.default.get(
        `${geoUrl}?q=${location}&apiKey=${apiKey}`,
      );
      return request;
    } catch (err) {
      throw new Error(err);
    }
  }

  // returns an address as a single string, and the corresponding coordinates
  async getCoordinates(address, geoUrl, apiKey) {
    try {
      const location: string = address.replace(/\s+/g, '+');
      // make the API request
      console.log('location before the request')
      console.log(location);
      const response: any = await this.makeRequest(
        location,
        geoUrl,
        apiKey
      );
      console.log(`Here is the Response`)
      console.log(response);
      // grab the coordinates
      const rawCoordinates =
        response.data.Response.View[0].Result[0].Location.DisplayPosition;
      // map the coords object to return
      const coords: [number, number] = [
        rawCoordinates.Latitude,
        rawCoordinates.Longitude,
      ];
      return coords;
    } catch (err) {
      throw new Error(err);
    }
  }
}
