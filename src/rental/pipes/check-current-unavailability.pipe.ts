import { Injectable, PipeTransform } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleUnavailabilityDto } from '../dto/scheduled-unavailability.dto';
import { Unavailability } from '../interface/unavailability.interface';
import { MTime } from '../alias/military-time.alias';
import { toItemIndexes } from 'src/common/util/to-item-indexes';

/**
 * Query DB and check if any of the requested Unavailability already exists
 * If it does throw an Error
 */
@Injectable()
export class CheckUnavailabilityPipe implements PipeTransform {

    constructor(
        @InjectModel('Unavailability') private readonly unavailabilityModel: Model<Unavailability>,
    ) {}

    private validate2Years = async (yearB: Unavailability[]): Promise<void> => {
        const check = yearB[0].year;
        for (const x of yearB) {
            if (x.year !== check) {
                throw new Error('Cannot request 3 years of unavailability');
            }
        }
        return;
    }

    private validateEachYear = async (unavailability: Unavailability[]) => {
        const base = unavailability[0];
        for (const {item, index} of toItemIndexes(unavailability)) {
            // uniform rentalId
            if (item.rentalId !== base.rentalId) {
                throw new Error('request cannot have more than 1 Rental ID');
            }
            // start before end
            if (item.start >= item.end) {
                throw new Error('start time cannot be before end time');
            }
            // uniform interval
            if (item.start !== base.start || item.end !== base.end) {
                throw new Error('each requested day of unavailability must share the same start end time');
            }
            // uniform year
            if (item.year !== base.year) {
                throw new Error('invalid years');
            }
            // sequential DOY
            if (index > 0) {
                if (unavailability[index].doy <= unavailability[index - 1].doy) {
                    throw new Error('The requested unavailability is not sequential');
                }
            }
            // uniform title
            if (item.title !== base.title) {
                throw new Error('request cannot have more than one title');
            }
        }
    }

    private sequelizeYears = async (sorted: Sorted): Promise<Ordered> => {
        if (sorted.yA[0].year < sorted.yB[0].year) {
            return {y1: sorted.yA, y2: sorted.yB};
        }
        return {y1: sorted.yB, y2: sorted.yA};
    }

    // find the min and max Unavailability
    private minMax = async (year: Unavailability[]) => {
        const years: number[] = year.map(x => x.year);
        const min: number = Math.min(...years);
        const max: number = Math.max(...years);
        const minIndex = year.findIndex(x => x.year === min);
        const maxIndex = year.findIndex(x => x.year === max);
        return {min: year[minIndex], max: year[maxIndex]};
    }

    // return min, max, year, start, and end for y1 and y2
    private processYears = async (sorted: Sorted): Promise<Processed> => {
        // a single year
        if (sorted.yB === null) {
            await this.validateEachYear(sorted.yA)
            const {min, max} = await this.minMax(sorted.yA);
            return {
                y1: {
                    min,
                    max,
                    year: sorted.yA[0].year,
                    start: sorted.yA[0].start,
                    end: sorted.yA[0].end,
                    data: sorted.yA,
                },
                y2: null,
            };
        }
        // two years
        const {y1, y2} = await this.sequelizeYears(sorted);
        await this.validateEachYear(y1);
        await this.validateEachYear(y2);
        const temp1 = await this.minMax(y1);
        const temp2 = await this.minMax(y2);
        return {
            y1: {
                min: temp1.min,
                max: temp1.max,
                year: y1[0].year,
                start: y1[0].start,
                end: y1[0].end,
                data: y1,
            },
            y2: {
                min: temp2.min,
                max: temp2.max,
                year: y2[0].year,
                start: y2[0].start,
                end: y2[0].end,
                data: y2,
            },
        };
    }

    private checkForOverlap = async (data: Processed) => {
        const { y1, y2 } = data;
        // if there are 2 years
        if (y2 !== null) {
            const y1Query = await this.createQuery(y1);
            const y2Query = await this.createQuery(y2);
            // query for both years
            const test1 = await this.unavailabilityModel.find(y1Query);
            const test2 = await this.unavailabilityModel.find(y2Query);
            if (test1.length || test2.length) {
                throw new Error('this request overlaps with existing unavailability');
            }
        }
        // else
        const query = await this.createQuery(y1);
        const test = await this.unavailabilityModel.find(query);
        if (test.length) {
            throw new Error('this request overlaps with existing unavailability');
        }
    }

    // return one or two arrays of DOY sorted Unavailability
    private sort = async (value: ScheduleUnavailabilityDto): Promise<Sorted> => {
        // grab the year property from the first element
        const iYear: number = value.unavailability[0].year;
        // filter for other year(s)
        const tYearB: Unavailability[] = value.unavailability.filter(val => val.year !== iYear);
        // return both years
        if (tYearB && tYearB.length) {
            await this.validate2Years(tYearB);
            // sort yearB by DOY
            const yearB = tYearB.sort((a, b) => a.doy - b.doy);
            // filter for initially grabbed year and sort by DOY
            const yearA: Unavailability[] = (value.unavailability.filter(val => val.year === iYear ))
                .sort((a, b) => a.doy - b.doy);
            return {yA: yearA, yB: yearB};
        }
        return {
            yA: value.unavailability.sort((a, b) => a.doy - b.doy), 
            yB: null,
        };
    }

    private createQuery = async (year) => {
        return {
            rentalId: year.min.rentalId,
            year: year.year,
            doy: {$lte: year.max.doy, $gte: year.min.doy},
            start: {$gte: year.start, $lte: year.end},
            end: {$lte: year.end, $gte: year.start},
        };
    }

    async transform(value: ScheduleUnavailabilityDto) {
        // sort if there are 2 years
        const sorted: Sorted = await this.sort(value);
        // return min and max for each provided year; or null for y2
        const processed: Processed = await this.processYears(sorted);
        // validate there is no overlap
        await this.checkForOverlap(processed);
    }
}

interface Sorted {
    yA: Unavailability[];
    yB: Unavailability[] | null;
}

interface Processed {
    y1: { min: Unavailability, max: Unavailability, year: number, start: MTime, end: MTime, data: Unavailability[] };
    y2: { min: Unavailability, max: Unavailability, year: number, start: MTime, end: MTime, data: Unavailability[] } | null;
}

interface Ordered {
    y1: Unavailability[];
    y2: Unavailability[];
}
