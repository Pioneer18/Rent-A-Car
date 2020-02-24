import { TestingModule, Test } from '@nestjs/testing';
import { RentalDurationPipe } from './rental-duration.pipe';
import { RentalDurationDto } from '../dto/rental-duration.dto';
import { PostGivenNoticeDto } from '../dto/post-given-notice.dto';
import { DateTime } from 'luxon';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { Logger } from '@nestjs/common';

/**
 * Summary:
 * accepts a PostGivenNoticeDto and returns a RentalDurationDto
 * uses the GenerateRentalDurationEnumUtil to assign the rentalDuration property
 * of the RentalDurationDto
 */
describe('RentalDurationPipe Unit Test', () => {

    let app: TestingModule;
    let pipe: RentalDurationPipe;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RentalDurationPipe, GenerateRentalDurationEnumUtil],
        }).compile();
        app = module;
        pipe = module.get<RentalDurationPipe>(RentalDurationPipe);
    });

    describe('transform method unit test', () => {
        it('should return a RentalDuration', async () => {
            const mockPostGivenNoticeDto: PostGivenNoticeDto = {
                address: '204 W Washington St Lexington 24450',
                rentalStartTime: DateTime.fromISO(new Date('February 25, 2020 10:46:00').toISOString()),
                rentalEndTime: DateTime.fromISO(new Date('February 28 , 2020 20:24:00').toISOString()),
                price: null,
                features: null,
                givenNotice: 2,
            }
            const mockRentalDurationDto: RentalDurationDto = {
                address: '204 W Washington St Lexington 24450',
                rentalDuration: 3,
                price: null,
                features: null,
                givenNotice: 2,
            };
            const test = await pipe.transform(mockPostGivenNoticeDto);
            Logger.log('the test results below');
            Logger.log(test);
            expect(test.address).toBe(mockRentalDurationDto.address);
            expect(test.features).toBe(mockRentalDurationDto.features);
            expect(test.givenNotice).toBe(mockRentalDurationDto.givenNotice);
            expect(test.price).toBe(mockRentalDurationDto.price);
            expect(test.rentalDuration).toBe(mockRentalDurationDto.rentalDuration);
        });
    });

    afterAll(async () => {
        app.close();
    });
});
