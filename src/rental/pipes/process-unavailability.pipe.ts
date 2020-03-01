import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { ValidatedUnavailabilityDto } from '../interface/validated-unavailability';
import { ProcessedUnavailabilityDto } from '../dto/processed-unavailability.dto';
import { UnavailabilityQuery } from '../interface/unavailability-query.interface';
import { Processed } from '../interface/processed.interface';

@Injectable()
export class ProcessUnavailabilityPipe implements PipeTransform {
  private createQuery = async (year: Processed): Promise<UnavailabilityQuery> => {
    return {
      rentalId: year.min.rentalId,
      year: year.year,
      doy: { $lte: year.max.doy, $gte: year.min.doy },
      start: { $gte: year.start, $lte: year.end },
      end: { $lte: year.end, $gte: year.start },
    };
  }

  /**
   * map data for given years
   * @param value the validated unavailability array(s)
   */
  async transform(value: ValidatedUnavailabilityDto): Promise<ProcessedUnavailabilityDto> {
    const {y1, y2} = value;
    if (y2 !== null) {
        const a1 = {
          min: y1[0],
          max: y1[y1.length - 1],
          year: y1[0].year,
          start: y1[0].start,
          end: y1[0].end,
          data: y1,
        };
        const a2 = {
          min: y2[0],
          max: y2[y2.length - 1],
          year: y2[0].year,
          start: y2[0].start,
          end: y2[0].end,
          data: y2,
        };
        return {
          y1Query: await this.createQuery(a1),
          y2Query: await this.createQuery(a2),
        };
    }
    const b = {
        min: y1[0],
        max: y1[y1.length - 1],
        year: y1[0].year,
        start: y1[0].start,
        end: y1[0].end,
        data: y1,
    };
    return {
      y1Query: await this.createQuery(b),
      y2Query: null,
    };
  }
}
