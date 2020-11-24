import { Test, TestingModule } from '@nestjs/testing';
import { GivenNoticePipe } from './given-notice.pipe';
import { RawSearchRentalDto } from '../dto/crud/raw-search-rental.dto';
import { Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
/**
 * What does this pipe do?
 * summary:
 * Accepts a RawSearchRentalDto and returns a PostGivenNoticeDto
 * creates a givenNotice
 * validatesRequestedTime
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
      let tempStart = new Date();
      tempStart.setHours(tempStart.getHours() + 1).toString();
      if (tempStart.getMinutes() >= 30) {
        tempStart.setHours(tempStart.getHours() + 1);
      } else {
        tempStart.setMinutes(tempStart.getMinutes() + 30);
      }
      // current
      let current = new Date();
      // set a rentalEndDate 5 hours from now
      let tempEnd = new Date();
      tempEnd.setHours(tempEnd.getHours() + 5).toString();
      // intentional fail
      let failTime = new Date();
      failTime.setMinutes(failTime.getMinutes() - 1);
      // 1 hour difference pass
      let plusOneHour = new Date();
      plusOneHour.setHours(plusOneHour.getHours() + 1);
      plusOneHour.setMinutes(plusOneHour.getMinutes() + 1);
      // convert to DateTimes
      tempStart = DateTime.fromISO(new Date(tempStart).toISOString());
      tempEnd = DateTime.fromISO(new Date(tempEnd).toISOString());
      plusOneHour = DateTime.fromISO(new Date(plusOneHour).toISOString());
      failTime = DateTime.fromISO(new Date(failTime).toISOString());
      current = DateTime.fromISO(new Date(current).toISOString());
      return { tempStart, tempEnd, failTime, plusOneHour, current };
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
      const { tempStart, tempEnd } = await setTime();
      const mockRawSearchRentalDto: RawSearchRentalDto = {
        address: '204 W Washington St Lexington 24450',
        rentalStartTime: tempStart,
        rentalEndTime: tempEnd,
        price: null,
        features: null,
      };
      const test = await pipe.transform(mockRawSearchRentalDto);
      expect(test.address).toBe('204 W Washington St Lexington 24450');
      expect(test.features).toBe(null);
      expect(test.price).toBe(null);
      expect(test.rentalStartTime.toString()).toBe(tempStart.toString());
      expect(test.rentalEndTime.toString()).toBe(tempEnd.toString());
      // expect(test.givenNotice).toBeGreaterThan()
    });
  });

  describe('createGivenNotice unit test', () => {
    it('should return a number greater than 3600000 (milliseconds)', async () => {
      const { tempStart, failTime } = await setTime();
      const mockCreateGivenNotice = async startTime => {
        Logger.log(`the startTime: ${startTime}`);
        const givenNotice: number = startTime.diffNow().toObject().milliseconds;
        Logger.log(`the given Notice: ${givenNotice}`);
        if (givenNotice >= 3600000) {
          return givenNotice;
        }
        return 'Sorry, you cannot request a rental less than an hour before it begins';
      };
      // pass
      expect(await mockCreateGivenNotice(tempStart)).toBeGreaterThan(36000);
      // fail
      expect(await mockCreateGivenNotice(failTime)).toBe(
        'Sorry, you cannot request a rental less than an hour before it begins',
      );
    });
  });

  describe('validateRequestedTime unit test', () => {
    const mockValidateRequestedTime = async (startTime, endTime) => {
      if (startTime > endTime) {
        return 'The rental start time cannot be after the rental end time';
      }
      if (endTime.diff(startTime).toObject().milliseconds < 3600000) {
        return 'The rental must be at least 1 hour in Duration';
      }
      return true;
    };
    it('should return an error if startTime > endTime', async () => {
      const { tempStart, tempEnd } = await setTime();
      expect(await mockValidateRequestedTime(tempEnd, tempStart)).toBe(
        'The rental start time cannot be after the rental end time',
      );
    });
    it('should return an error if there is < 1 hour difference between start and end time', async () => {
      const { failTime, current } = await setTime();
      expect(await mockValidateRequestedTime(failTime, current)).toBe(
        'The rental must be at least 1 hour in Duration',
      );
    });
    it('should return true', async () => {
      const { plusOneHour, current } = await setTime();
      expect(await mockValidateRequestedTime(current, plusOneHour)).toBe(true);
    });
  });

  afterAll(async () => {
    app.close();
  });
});
