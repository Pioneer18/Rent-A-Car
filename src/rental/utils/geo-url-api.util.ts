import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import { RawCoordinatesDto } from '../dto/geocoding/raw-coordinates.dto';

/**
 * GECODING & SEARCH API UTILITY
 * @param {string} address the address to request coordinates for
 * @param {string} geoUrl base url of the Geocoding and Search geocoding request
 * @param {string} apiKey Geocoding and Search v7 API Key
 * [Respose Object] = response.data.items[0]
 *  .title: the complete address as a string
 *  .address the complete address as an object
 *  .position: {lat: number, lng: number}
 *  .mapView: {west: -number, south: number, east: -number, north: number}
 * 
 */
@Injectable()
export class GeoUrlApiUtil {
  /**
   * Send Geocoder Request
   * @param location the address string
   * @param geoUrl the base HERE geocoding and search v7 api url
   * @param apiKey the api key
   */
  private async makeRequest(location, geoUrl, apiKey) {
    try {
      console.log(`Geocoding & Search API Request: ${geoUrl}?q=${location}&apiKey=${apiKey}`)
      const request: any = await axios.default.get(
        `${geoUrl}?q=${location}&apiKey=${apiKey}`,
      );
      return request;
    } catch (err) {
      throw new Error(err);
    }
  }

  // returns an address as a single string, and the corresponding coordinates
  async getCoordinates(address, geoUrl, apiKey):Promise<[number, number]> {
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
      // grab the coordinates
      const rawCoordinates: RawCoordinatesDto =
        response.data.items[0].position;
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
