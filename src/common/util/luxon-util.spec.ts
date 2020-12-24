import { Test, TestingModule } from '@nestjs/testing';
import { LuxonUtil } from './luxon-util';

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
  
  describe('createDate method test', ()=> {
    const dates: string[] = ["December 17, 1995 03:24:00"]
    const date: Date = new Date("December 17, 1995 03:24:00");
    const response = [date];
    it('should create a new Date Object array from the given string array', async () =>{
      jest
        .spyOn(util,'createJsDate')
        .mockImplementation(() => response);
      expect(util.createJsDate(dates)).toBe(response);
    });
  })
})


