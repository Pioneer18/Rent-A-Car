import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EditDetailsPipe implements PipeTransform {
    /**
     * validate EditDetailsDto
     */
    async transform(value) {
        // must have at least one value or throw error
        // blank values must be null
    }
}
