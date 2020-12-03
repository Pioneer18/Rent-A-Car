import { Test, TestingModule } from "@nestjs/testing"
import { UnavailabilityDto } from "../dto/unavailability/unavailability.dto";
import { ValidateUnavailabilityPipe } from "./validate-unavailability.pipe";
import { DateTime, Interval, fromJSDate } from 'luxon'
import { Logger } from "@nestjs/common";
import { ValidateScheduleUnavailabilityDto } from "../dto/unavailability/schedule/validate-schedule-unavailability.dto";
import { ValidatedUnavailabilityDto } from "../dto/unavailability/validated-unavailability.dto";

describe('ValidateUnavailabilityPipe Unit Test', () => {

    let util: ValidateUnavailabilityPipe;
    let app: TestingModule;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ValidateUnavailabilityPipe]
        }).compile();
        app = module;
        util = module.get<ValidateUnavailabilityPipe>(ValidateUnavailabilityPipe);
    })

    describe('ValidateUnavailabilityPipe definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('Tansform method test', () => {
        const data: ValidateScheduleUnavailabilityDto = {
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
        const response: ValidatedUnavailabilityDto = {
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
            "y2": null,
            "validated": "VALIDATED"
        }
        it('should return a ValidateUnavailabilityDto', async () => {
            jest
                .spyOn(util, 'transform')
                .mockImplementation(async () => response)
            expect(await util.transform(data)).toBe(response);
        })
    })

    afterAll(async () => {
        await app.close();
    });
});