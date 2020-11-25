import { TestingModule, Test } from '@nestjs/testing';
import { RentalDurationPipe } from './rental-duration.pipe';
import { RequestCoordinatesDto } from '../dto/searchRental/request-coordinates.dto';
import { GivenNoticeSearchRentalDto } from '../dto/searchRental/given-notice-search-rental-dto';
import { DateTime } from 'luxon';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { Logger } from '@nestjs/common';

/**
 * Summary:
 * accepts a GivenNoticeSearchRentalDto and returns a RequestCoordinatesDto
 * uses the GenerateRentalDurationEnumUtil to assign the rentalDuration property
 * of the RequestCoordinatesDto
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
      const mockGivenNoticeSearchRentalDto: GivenNoticeSearchRentalDto = {
        address: '204 W Washington St Lexington 24450',
        rentalStartTime: DateTime.fromISO(
          new Date('February 25, 2020 10:46:00').toISOString(),
        ),
        rentalEndTime: DateTime.fromISO(
          new Date('February 28 , 2020 20:24:00').toISOString(),
        ),
        price: null,
        features: null,
        givenNotice: 2,
      };
      const mockRentalDurationDto: RequestCoordinatesDto = {
        address: '204 W Washington St Lexington 24450',
        rentalDuration: 3,
        price: null,
        features: null,
        givenNotice: 2,
      };
      const test = await pipe.transform(mockGivenNoticeSearchRentalDto);
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
