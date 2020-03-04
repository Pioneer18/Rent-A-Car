import { Injectable, PipeTransform } from '@nestjs/common';
/**
 * - ValidateUpdateUnavailabilityPipe
 * - MUST BE SAME TIME INTERVAL, OTHERWISE JUST ADDING A NEW UNAVAILABILITY
 * - SO QUERY MUST MATCH TIME & ID AND YEAR; TITLE usd for indexing
 * - if above is true, then validate the update data; same rules as adding one
 */
@Injectable()
export class ValidateUnavailabilityUpdateDataPipe implements PipeTransform {
    async transform(value) {
        // do stuffs
        // #1 validate years (match original)
        // #2 validate DOY range matches original
        // #3 validate start and end request is legit (0-24; start before end, 1 hour minimum range)
    }
}
