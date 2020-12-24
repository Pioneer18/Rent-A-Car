import { Test, TestingModule } from '@nestjs/testing';
import { LuxonUtil } from './luxon-util';
import { DateTime } from 'luxon';

describe('Luxon Util Unit Test', () => {
  let util: LuxonUtil

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuxonUtil],
    }).compile();
    util = module.get<LuxonUtil>(LuxonUtil);
  })

  describe('definition test', () => {
    it('should be defined', () => {
      expect(new LuxonUtil()).toBeDefined();
    });
  });

  describe('createDate method test', () => {
    const dates: string[] = ["December 17, 1995 03:24:00"]
    const date: Date = new Date("December 17, 1995 03:24:00");
    const response = [date];
    it('should create a new Date Object array from the given string array', async () => {
      jest
        .spyOn(util, 'createJsDate')
        .mockImplementation(() => response);
      expect(await util.createJsDate(dates)).toBe(response);
    });
  })

  describe('dateToDateTime method test', () => {
    const date: Date = new Date("December 17, 1995 03:24:00");
    const dates = [date];
    const dateTimes = DateTime.fromISO(date.toISOString());
    const response = [dateTimes];
      it('should create a new DateTimes array from the given Dates array', async () => {
        jest
          .spyOn(util, 'dateToDateTime')
          .mockImplementation(async () => response);
        expect(await util.dateToDateTime(dates)).toBe(response);
      })
  })
})


