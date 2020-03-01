import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProcessUnavailabilityPipe implements PipeTransform {

  async transform(value) {
    // process stuff
  }
}
