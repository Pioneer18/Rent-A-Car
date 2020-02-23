import { Injectable, PipeTransform } from '@nestjs/common';
import { RentalDurationDto } from '../dto/generated-duration.dto';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { SearchRentalDto } from '../dto/search-rental.dto';

@Injectable()
export class RequestCoordinatesPipe implements PipeTransform<any> {

    private readonly geoUrl = process.env.GEO_URL;
    private readonly appId = process.env.GEO_ID;
    private readonly appCode = process.env.GEO_CODE;
    constructor(private readonly geoUrlApiUtil: GeoUrlApiUtil) {

    }
    // separate pipe: generateRentalDuration
    // accepts RawRentalDto, returns RentalDurationDto
    // convert incoming RentalStart and RentalEnd Date objects to DateTimes => util (used by validation pipe after this one)
    // generate rental duration enum from the given startTime and endTime

    // separate pipe: this pipe
    // accepts RentalDurationDto returns SearchRentalDto
    // request coordinates with passed in address => util
    // return a return SearchRentalDto with a loc => the pipe

    // separate pipe: validate GivenNotice
    // validate the GivenNotice => separate pipe
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
            };
            return dto;
        } catch (err) {
            throw new Error(err);
        }
    }
}
