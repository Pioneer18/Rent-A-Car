/**
 * **summary**: Dto returned by the Geocoding & Searching v7 API when given an address
 * - passed to GeoUrlApiUtil
 * - note: [**request payloads**](https://docs.nestjs.com/controllers#request-payloads) are dto classes and not interfaces so they can be accessed by NestJS at runtime
 */
export class RawCoordinatesDto {
    lat: number;
    lng: number;
}
