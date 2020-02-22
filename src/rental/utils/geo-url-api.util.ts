import { Injectable } from '@nestjs/common';
import * as axios from 'axios';

/**
 * @param {string} address the address to request coordinates for
 * @param {string} geoUrl the link to the API that returns a coordinate for a provided address
 * @param {appId} appId the Id for using the API
 * @param {appCode} appCode the code for using the API
 */
@Injectable()
export class GeoUrlApiUtil {
    /**
     * returns an address as a single string, and the corresponding coordinates
     */
    async getCoordinates(address, geoUrl, appId, appCode) {
        try {
            const location: string = address.replace(/\s+/g, '+');
            // make the API request
            const request: any = await axios.default.get(
                `${geoUrl}?app_id=${appId}&app_code=${appCode}&searchtext=${location}`,
            );
            // grab the coordinates
            const rawCoordinates =
                request.data.Response.View[0].Result[0].Location.DisplayPosition;
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
