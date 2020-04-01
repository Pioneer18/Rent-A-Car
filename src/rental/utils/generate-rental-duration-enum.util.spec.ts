import { TestingModule, Test } from '@nestjs/testing';
import { GenerateRentalDurationEnumUtil } from './generate-rental-duration-enum.util';
import { DateTime, Interval } from 'luxon';
import { Logger } from '@nestjs/common';
import { RentalDurations } from '../const';
/**
 * What does this util do?
 * Summary:
 * returns RentalDuration from given rentalTimes
 * processes the rental time into months, weeks, and days
 * Tests:
 * #1 generateRentalDurationEnum
 * expect correct Enum from each case
 * #2 processRentalTime
 * expect months, weeks, and days; respective to the time entered
 */
describe('GenerateRentalDurationEnumUtil Unit Test', () => {
  let app: TestingModule;
  let util: GenerateRentalDurationEnumUtil;
  let createTime;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateRentalDurationEnumUtil],
    }).compile();
    app = module;
    util = module.get<GenerateRentalDurationEnumUtil>(
      GenerateRentalDurationEnumUtil,
    );

    const temp = async () => {
      const now: DateTime = DateTime.local();
      // 1 day
      const oneDay = now.plus({ days: 1 });
      // 3 days
      const threeDays = now.plus({ days: 3 });
      // 5 days
      const fiveDays = now.plus({ days: 5 });
      // 1 week
      const oneWeek = now.plus({ weeks: 1 });
      // 3 weeks
      const threeWeeks = now.plus({ weeks: 3 });
      // 1 month
      const oneMonth = now.plus({ months: 1 });
      // 3 months
      const threeMonths = now.plus({ months: 3 });
      return {
        now,
        oneDay,
        threeDays,
        fiveDays,
        oneWeek,
        threeWeeks,
        oneMonth,
        threeMonths,
      };
    };
    createTime = temp;
  });

  describe('processRentalTime method test', () => {
    it('should return rental duration as months, weeks, and days', async () => {
      const { now, oneMonth } = await createTime();
      const mockProcessRentalTime = async (startTime, endTime) => {
        try {
          const base = Interval.fromDateTimes(startTime, endTime);
          const months = base.length('months');
          const weeks = base.length('weeks');
          const days = base.length('days');
          Logger.log(`The Base`);
          Logger.log(base);
          Logger.log(`months: ${months}, weeks: ${weeks}, days: ${days}`);
          return { months, weeks, days };
        } catch (err) {
          throw new Error(err);
        }
      };
      const test = await mockProcessRentalTime(now, oneMonth);
      Logger.log('test ------------------------------');
      Logger.log(
        `Days: ${test.days}, Weeks: ${test.weeks}, Months: ${
          test.months
        } test ------------------------------`,
      );
      expect(test.days).toBe(29);
      expect(test.weeks).toBeGreaterThan(4); // 4.14 weeks
      expect(test.months).toBe(1);
    });
  });

  describe('generateRentalDurationEnum method test', () => {
    it('should generate the correct enum for 1 day', async () => {
      const { now, oneDay } = await createTime();
      expect(await util.generateRentalDurationEnum(now, oneDay)).toBe(
        RentalDurations['1 Day'],
      );
    });
    it('should generate the correct enum for 3 days', async () => {
      const { now, threeDays } = await createTime();
      expect(await util.generateRentalDurationEnum(now, threeDays)).toBe(
        RentalDurations['3 Days'],
      );
    });
    it('should generate the correct enum for 5 days', async () => {
      const { now, fiveDays } = await createTime();
      expect(await util.generateRentalDurationEnum(now, fiveDays)).toBe(
        RentalDurations['5 Days'],
      );
    });
    it('should generate the correct enum for 1 week', async () => {
      const { now, oneWeek } = await createTime();
      expect(await util.generateRentalDurationEnum(now, oneWeek)).toBe(
        RentalDurations['1 Week'],
      );
    });
    it('should generate the correct enum for 3 weeks', async () => {
      const { now, threeWeeks } = await createTime();
      expect(await util.generateRentalDurationEnum(now, threeWeeks)).toBe(
        RentalDurations['3 Weeks'],
      );
    });
    it('should generate the correct enum for 1 month', async () => {
      const { now, oneMonth } = await createTime();
      expect(await util.generateRentalDurationEnum(now, oneMonth)).toBe(
        RentalDurations['1 Month'],
      );
    });
    it('should generate the correct enum for 3 months', async () => {
      const { now, threeMonths } = await createTime();
      expect(await util.generateRentalDurationEnum(now, threeMonths)).toBe(
        RentalDurations['3 Months'],
      );
    });
  });

  afterAll(async () => {
    app.close();
  });
});
