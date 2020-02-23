import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SearchVehiclePipe implements PipeTransform<any> {
    // separate pipe: generateRentalDuration
    // convert incoming RentalStart and RentalEnd Date objects to DateTimes => util (used by validation pipe after this one)
    // generate rental duration enum from the given startTime and endTime

    // separate pipe: this pipe
    // request coordinates with passed in address => util
    // return a return SearchVehicleDto with a loc => the pipe

    // separate pipe: validate GivenNotice
    // validate the GivenNotice => separate pipe
    async transform(value) {
        // do stuffs
    }
}
