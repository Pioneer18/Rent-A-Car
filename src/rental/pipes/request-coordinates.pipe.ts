import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { RentalDurationDto } from '../dto/rental-duration.dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { SearchRentalDto } from '../dto/search-rental.dto';

@Injectable()
export class RequestCoordinatesPipe implements PipeTransform<any> {

    constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {
    }

    private async getCoordinates(address: string, appCode: string, appId: string, geoUrl: string) {
        const coords = await this.geoUrlApiUtil.getCoordinates(address, appCode, appId, geoUrl);
        return coords;
    }

    async transform(value: RentalDurationDto) {
        const geoUrl = process.env.GEO_URL;
        const appId = process.env.GEO_ID;
        const appCode = process.env.GEO_CODE;
        try {
            // Logger.log(`geoUrl: ${geoUrl}`);
            const dto: SearchRentalDto = {
                address: value.address,
                price: value.price,
                features: value.features,
                rentalDuration: value.rentalDuration,
                loc: {
                    type: 'Point',
                    coordinates: await this.geoUrlApiUtil.getCoordinates(value.address, geoUrl, appId, appCode),
                },
                givenNotice: value.givenNotice,
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}
