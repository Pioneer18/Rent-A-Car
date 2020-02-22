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

    address: string;
    geoUrl: string;
    appId: string;
    appCode: string;

    constructor(address: string, geoUrl: string, appId: string, appCode: string) {
        this.address = address;
        this.geoUrl = geoUrl;
        this.appId = appId;
        this.appCode = appCode;
    }

    /**
     * returns an address as a single string, and the corresponding coordinates
     */
    async getCoordinates() {
        const location: string = this.address.replace(/\s+/g, '+');
        // create the request
        const response: any = await axios.default.get(
        `${this.geoUrl}?app_id=${this.appId}&app_code=${this.appCode}&searchtext=${location}`,
        );
        // grab the coordinates
        const rawCoordinates =
        response.data.Response.View[0].Result[0].Location.DisplayPosition;
        // push rawCoordinates to an array
        // coords.push(rawCoordinates.Latitude);
        // coords.push(rawCoordinates.Longitude);
        const coords: [number, number] = [
        rawCoordinates.Latitude,
        rawCoordinates.Longitude,
        ];
    }
}
