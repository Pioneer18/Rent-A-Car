import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { ValidatedUnavailabilityDto } from '../dto/validated-unavailability.dto';
import { ProcessedUnavailabilityDto } from '../dto/processed-unavailability.dto';
import { UnavailabilityQuery } from '../interface/unavailability-query.interface';
import { Processed } from '../interface/processed.interface';
import { ProcessedUnavailabilityInterface } from '../interface/processed-unavailability.interface';

@Injectable()
export class ProcessUnavailabilityPipe implements PipeTransform {
  private createQuery = async (
    year: Processed,
  ): Promise<UnavailabilityQuery> => {
    return {
      rentalId: year.min.rentalId,
      year: year.year,
      doy: { $lte: year.max.doy, $gte: year.min.doy },
      $or: [
        {
          // enclosed
          start: { $gte: year.start },
          end: { $lte: year.end },
        },
        {
          // offset before start
          start: { $lte: year.start },
          end: { $gte: year.start },
        },
        {
          // offset after end
          start: { $lte: year.end },
          end: { $gte: year.end },
        },
        {
          // outside
          start: { $lte: year.start },
          end: { $gte: year.end },
        },
      ],
    };
  }

  // add unavailabilityId for this Unavailability series to be quickly queried
  private addUnavailabilityId = async (
    value: ValidatedUnavailabilityDto,
  ): Promise<{
    pY1: ProcessedUnavailabilityInterface[];
    pY2: ProcessedUnavailabilityInterface[] | null;
  }> => {
    // temp arrays for transformation
    const tY1 = [];
    const tY2 = [];
    const uuid = Date.now().toString();
    // process 2 years
    if (value.y2) {
      value.y1.map(x => {
        // y1
        tY1.push({
          unavailabilityId: uuid,
          rentalId: x.rentalId,
          year: x.year,
          doy: x.doy,
          start: x.start,
          end: x.end,
          title: x.title,
        });
      });
      value.y2.map(x => {
        // y2
        tY2.push({
          unavailabilityId: uuid,
          rentalId: x.rentalId,
          year: x.year,
          doy: x.doy,
          start: x.start,
          end: x.end,
          title: x.title,
        });
      });
      // return processedUnavailabilityDto
      const pY1: ProcessedUnavailabilityInterface[] = tY1;
      const pY2: ProcessedUnavailabilityInterface[] = tY2;
      return { pY1, pY2 };
    }
    // process 1 year
    const ty1 = [];
    value.y1.map(x => {
      // y1
      ty1.push({
        unavailabilityId: uuid,
        rentalId: x.rentalId,
        year: x.year,
        doy: x.doy,
        start: x.start,
        end: x.end,
        title: x.title,
      });
    });
    const py1: ProcessedUnavailabilityInterface[] = ty1;
    return { pY1: py1, pY2: null };
  }

  /**
   * map data for given years
   * @param value the validated unavailability array(s)
   */
  async transform(
    value: ValidatedUnavailabilityDto,
  ): Promise<ProcessedUnavailabilityDto> {
    // add uuid
    const {pY1, pY2} = await this.addUnavailabilityId(value);
    const { y1, y2 } = value;
    if (y2 !== null) {
      const a1 = {
        min: y1[0],
        max: y1[y1.length - 1],
        year: y1[0].year,
        start: y1[0].start,
        end: y1[0].end,
      };
      const a2 = {
        min: y2[0],
        max: y2[y2.length - 1],
        year: y2[0].year,
        start: y2[0].start,
        end: y2[0].end,
      };
      return {
        y1Query: await this.createQuery(a1),
        y2Query: await this.createQuery(a2),
        data: {
          y1: pY1,
          y2: pY2,
        },
      };
    }
    const b = {
      min: y1[0],
      max: y1[y1.length - 1],
      year: y1[0].year,
      start: y1[0].start,
      end: y1[0].end,
    };
    return {
      y1Query: await this.createQuery(b),
      y2Query: null,
      data: {
        y1: pY1,
        y2: null,
      },
    };
  }
}
