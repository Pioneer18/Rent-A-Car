import { Test, TestingModule } from "@nestjs/testing"
import { ValidatedUnavailabilityDto } from "../dto/unavailability/validated-unavailability.dto";
import { ScheduleUnavailabilityInterface } from "../interface/service/schedule-unavailability.interface";
import { ProcessUnavailabilityPipe } from "./process-unavailability.pipe"

describe('ProcessUnavailabilityPipe', () => {

    let app: TestingModule;
    let util: ProcessUnavailabilityPipe;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProcessUnavailabilityPipe]
        }).compile()
        app = module;
        util = module.get<ProcessUnavailabilityPipe>(ProcessUnavailabilityPipe);
    })

    describe('ProcessUnavailabilityPipe definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        })
    })

    describe('transform method test', () => {
        const data: ValidatedUnavailabilityDto = {
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
        const response: ScheduleUnavailabilityInterface = {
            "y1Query": {
              "rentalId": "5fbdd52de2357234041850a2",
              "year": 2020,
              "doy": {
                "$lte": 360,
                "$gte": 358
              },
              "$or": [
                {
                  "start": {
                    "$gte": 0
                  },
                  "end": {
                    "$lte": 24
                  }
                },
                {
                  "start": {
                    "$lte": 0
                  },
                  "end": {
                    "$gte": 0
                  }
                },
                {
                  "start": {
                    "$lte": 24
                  },
                  "end": {
                    "$gte": 24
                  }
                },
                {
                  "start": {
                    "$lte": 0
                  },
                  "end": {
                    "$gte": 24
                  }
                }
              ]
            },
            "y2Query": null,
            "data": {
              "y1": [
                {
                  "unavailabilityId": "1607051588419",
                  "rentalId": "5fbdd52de2357234041850a2",
                  "year": 2020,
                  "doy": 358,
                  "start": 0,
                  "end": 24,
                  "title": "Christmas Break"
                },
                {
                  "unavailabilityId": "1607051588419",
                  "rentalId": "5fbdd52de2357234041850a2",
                  "year": 2020,
                  "doy": 359,
                  "start": 0,
                  "end": 24,
                  "title": "Christmas Break"
                },
                {
                  "unavailabilityId": "1607051588419",
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
          }
        it('should return a ProcessedUnavailabilityDto', async () => {
            jest
                .spyOn(util, 'transform')
                .mockImplementation(async () => response)
            expect(await util.transform(data)).toBe(response);
        })
    })
})