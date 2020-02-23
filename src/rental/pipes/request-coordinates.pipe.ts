import { Injectable, PipeTransform } from '@nestjs/common';
import { RentalDurationDto } from '../dto/rental-duration.dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { SearchRentalDto } from '../dto/search-rental.dto';

@Injectable()
export class RequestCoordinatesPipe implements PipeTransform<any> {

    private readonly geoUrl = process.env.GEO_URL;
    private readonly appId = process.env.GEO_ID;
    private readonly appCode = process.env.GEO_CODE;

    constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {

    }

    async transform(value: RentalDurationDto) {
        try {
            const dto: SearchRentalDto = {
                address: value.address,
                features: value.features,
                rentalDuration: value.rentalDuration,
                loc: {
                    type: 'Point',
                    coordinates: await this.geoUrlApiUtil.getCoordinates(value.address, this.geoUrl, this.appId, this.appCode),
                },
                givenNotice: value.givenNotice,
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}
