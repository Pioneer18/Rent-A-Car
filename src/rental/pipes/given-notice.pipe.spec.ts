import { Test, TestingModule } from '@nestjs/testing';
import { GivenNoticePipe } from './given-notice.pipe';
import { RawSearchRentalDto } from '../dto/raw-search-rental.dto';
import { Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
/**
 * What does this pipe do?
 * summary:
 * Accepts a RawSearchRentalDto and returns a PostGivenNoticeDto
 * creates a givenNotice
 * validatesRequestedTime
 * Tests:
 * #1 transform:
 * expect a PostGivenNotice from a valid given RawSearchRentalDto
 * expect an Error if an invalid RawSearchRentalDto is given
 * #2 createGivenNotice:
 * expect a number of milliseconds >= 3600000
 * expect an Error otherwise
 * #3 validateRequestedTime
 * expect an Error if startTime > endTime
 * expect an Error if there is less than an hour difference between the rental start and end time
 * expect a returned number greater than 3600000
 */
describe('GivenNoticePipe Unit Test', () => {

    let pipe: GivenNoticePipe;
    let app: TestingModule;
    let setTime;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GivenNoticePipe],
        }).compile();
        pipe = module.get<GivenNoticePipe>(GivenNoticePipe);
        app = module;

        const temp = async () => {
            // create a rentalStartDate at least 1.5 hours from now
            const tempStart = new Date();
            tempStart.setHours(tempStart.getHours() + 1).toString();
            if (tempStart.getMinutes() >= 30) {
                tempStart.setHours(tempStart.getHours() + 1);
            } else {
                tempStart.setMinutes(tempStart.getMinutes() + 30);
            }
            // set a rentalEndDate 5 hours from now
            const tempEnd = new Date();
            tempEnd.setHours(tempEnd.getHours() + 5).toString();
            return {tempStart, tempEnd};
        };
        setTime = temp;

    });


    describe('GivenNoticePipe definition unit test', () => {
        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });
    });

    describe('transform unit test', () => {
        // create a rentalStartDate at least 1.5 hours from now
        it('should return a PostGivenNotice object if given a RawSearchRentalDto', async () => {
            const time = await setTime();
            time.tempEnd.setHours(time.tempEnd.getHours() + 5).toString();
            const mockRawSearchRentalDto: RawSearchRentalDto = {
                address: '204 W Washington St Lexington 24450',
                rentalStartTime: time.tempStart,
                rentalEndTime: time.tempEnd,
                price: null,
                features: null,
            };
            const startTime = DateTime.fromISO(new Date(mockRawSearchRentalDto.rentalStartTime).toISOString());
            const endTime = DateTime.fromISO(new Date(mockRawSearchRentalDto.rentalEndTime).toISOString());
            Logger.log(`startTime: ${startTime} & endTime: ${endTime}`);
            const test = await pipe.transform(mockRawSearchRentalDto);
            Logger.log('the expected PostGivenNoticeDto?');
            Logger.log(test);
            expect(test.address).toBe('204 W Washington St Lexington 24450');
            expect(test.features).toBe(null);
            expect(test.price).toBe(null);
            Logger.log(`test.rentalStartTime: ${test.rentalStartTime} || startTime: ${startTime}`);
            expect(test.rentalStartTime.toString()).toBe(startTime.toString());
            expect(test.rentalEndTime.toString()).toBe(endTime.toString());
            // expect(test.givenNotice).toBeGreaterThan()
        });
    });

    describe('createGivenNotice unit test', () => {
        it('should..', async () => {
            // do stuffs
        });
    });

    describe('validateRequestedTime unit test', () => {
        it('should..', async () => {
            // do stuffs
        });
    });

    afterAll(async () => {
        app.close();
    });
});
