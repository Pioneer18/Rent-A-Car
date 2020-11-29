import { Injectable, PipeTransform, Logger } from '@nestjs/common';
import { ValidatedUnavailabilityDto } from '../dto/unavailability/validated-unavailability.dto';
import { ProcessedUnavailabilityDto } from '../dto/unavailability/schedule/processed-unavailability.dto';
import { UnavailabilityQueryDto } from '../dto/unavailability/schedule/unavailability-query.dto';
import { CreateQueryDto } from '../dto/unavailability/schedule/create-query.dto';
import { ProcessedUnavailabilityQueryDto } from '../dto/unavailability/schedule/processed-unavailability-query.dto';
/**
 * **summary**: Query for any scheduled unavailability already in the database that would overlap with this request to add more unavailability to the Rental
 * This is to prevent the user on the front-end from accidentally overlapping 'blocks' of scheduled unavailability. The front-end of course should also block this
 * @param year 
 */
@Injectable()
export class ProcessUnavailabilityPipe implements PipeTransform {

  /**
   * **summary**: Create a MongoDB query object from the provided CreateQueryDto
   * @param year data for creating a MongoDB update object
   */
  protected createQuery = async (
    year: CreateQueryDto,
  ): Promise<UnavailabilityQueryDto> => {
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

  /**
   * **summary**: Add unavailabilityId (uuid) to each UnavailabilityDto in the incoming ValidatedUnavailabilityDto
   * - this method checks if the user is schedling time only for this year or into the next year as well
   * - the uuid identifies a series of unavailability, allowing the entire block of time to be identified in the database
   * @param value the semi processed and validate client request data
   */
  protected addUnavailabilityId = async (
    value: ValidatedUnavailabilityDto,
  ): Promise<{
    pY1: ProcessedUnavailabilityQueryDto[];
    pY2: ProcessedUnavailabilityQueryDto[] | null;
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
      const pY1: ProcessedUnavailabilityQueryDto[] = tY1;
      const pY2: ProcessedUnavailabilityQueryDto[] = tY2;
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
    const py1: ProcessedUnavailabilityQueryDto[] = ty1;
    return { pY1: py1, pY2: null };
  }

  /**
   * **summary**: Process the request to update a rental's 'scheduled unavailability'
   * - the user may schedule as far as a year ahead. To easily track the data as a single 'block' of unavailable time for the rental, each Unavailability document related to this query is given the same 'uuid'
   * @param value the validated unavailability request dto
   */
  transform = async(
    value: ValidatedUnavailabilityDto,
  ): Promise<ProcessedUnavailabilityDto> => {
    // add uuid
    const {pY1, pY2} = await this.addUnavailabilityId(value);
    const { y1, y2 } = value;
    // create Unavailability model queries for each year
    if (y2 !== null) {
      const createQuery1: CreateQueryDto = {
        min: y1[0],
        max: y1[y1.length - 1],
        year: y1[0].year,
        start: y1[0].start,
        end: y1[0].end,
      };
      const createQuery2: CreateQueryDto = {
        min: y2[0],
        max: y2[y2.length - 1],
        year: y2[0].year,
        start: y2[0].start,
        end: y2[0].end,
      };
      return {
        y1Query: await this.createQuery(createQuery1),
        y2Query: await this.createQuery(createQuery2),
        data: {
          y1: pY1,
          y2: pY2,
        },
      };
    }
    // create an Unavailability model query for just one year
    const createQuery = {
      min: y1[0],
      max: y1[y1.length - 1],
      year: y1[0].year,
      start: y1[0].start,
      end: y1[0].end,
    };
    return {
      y1Query: await this.createQuery(createQuery),
      y2Query: null,
      data: {
        y1: pY1,
        y2: null,
      },
    };
  }
}
