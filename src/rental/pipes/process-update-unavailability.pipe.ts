import { Injectable, PipeTransform } from '@nestjs/common';
/**
 * create and return a query from the incoming dto
 */
@Injectable()
export class ProcessUpdateUnavailabilityPipe implements PipeTransform {
  async transform(value) {
      // do stuffs
  }
}