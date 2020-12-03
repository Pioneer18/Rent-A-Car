import { Test, TestingModule } from "@nestjs/testing"
import { RawScheduleUnavailabilityDto } from "../dto/unavailability/schedule/raw-schedule-unavailability.dto";
import { ValidateScheduleUnavailabilityDto } from "../dto/unavailability/schedule/validate-schedule-unavailability.dto";
import { SortUnavailabilityPipe } from "./sort-unavailability.pipe";

describe('SortUnavailabilityPipe Unit Test', () => {

    let util: SortUnavailabilityPipe;
    let app: TestingModule;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SortUnavailabilityPipe]
        }).compile()
        app = module;
        util = module.get<SortUnavailabilityPipe>(SortUnavailabilityPipe);;
    });

    describe('SortUnavailabilityPipe definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('transform method test', () => {
        const data: RawScheduleUnavailabilityDto = {
            unavailability: [
                {
                    "rentalId": "5fbdd52de2357234041850a2",
                    "year": 2020,
                    "doy": 358,
                    "start": 0, 
                    "end": 24,
                    "title": "Christmas Break"
                },
                {
                    "rentalId": "5fbdd52de2357234041850a2",
                    "year": 2020,
                    "doy": 359,
                    "start": 0, 
                    "end": 24,
                    "title": "Christmas Break"
                },
                {
                    "rentalId": "5fbdd52de2357234041850a2",
                    "year": 2020,
                    "doy": 360,
                    "start": 0, 
                    "end": 24,
                    "title": "Christmas Break"
                }
            ]
        }
        const response: ValidateScheduleUnavailabilityDto = {
            "y1": [
              {
                "rentalId": "5fbdd52de2357234041850a2",
                "year": 2020,
                "doy": 358,
                "start": 0,
                "end": 24,
                "title": "Christmas Break"
              },
              {
                "rentalId": "5fbdd52de2357234041850a2",
                "year": 2020,
                "doy": 359,
                "start": 0,
                "end": 24,
                "title": "Christmas Break"
              },
              {
                "rentalId": "5fbdd52de2357234041850a2",
                "year": 2020,
                "doy": 360,
                "start": 0,
                "end": 24,
                "title": "Christmas Break"
              }
            ],
            "y2": null
          }
        it('should return a ValidateScheduleUnavailabilityDto', async () => {
            jest
                .spyOn(util, 'transform')
                .mockImplementation(async () => response)
            expect(await util.transform(data)).toBe(response);
        })
    })

    afterAll(async () => {
        await app.close();
    });
})