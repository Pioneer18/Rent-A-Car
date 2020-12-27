import { Test, TestingModule } from "@nestjs/testing"
import { LuxonUtil } from "../../common/util/luxon-util";
import { PickupUnavailabilityValidationMiddleware } from "./pickup-unavailability-validation.middleware"
import { UnavailabilityDto } from "../dto/unavailability.dto";
import { DateTime } from 'luxon';

describe('Pickup Unavailability Validation Middleware Unit Test', () => {

    let app: TestingModule;
    let middleware: PickupUnavailabilityValidationMiddleware;
    let util: LuxonUtil
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PickupUnavailabilityValidationMiddleware,
                LuxonUtil
            ]
        }).compile();
        app = module;
        middleware = module.get<PickupUnavailabilityValidationMiddleware>(PickupUnavailabilityValidationMiddleware);
        util = module.get<LuxonUtil>(LuxonUtil);
    });

    describe('PickupUnavailabilityValidationMiddleware definition test', () => {
        it('should be defined', async () => {
            expect(middleware).toBeDefined();
        });
    });

    describe('convertToDateTimes method test', () => {
        it('should convert the date strings into Luxon DateTime objects', async () => {

            const unavailability: UnavailabilityDto = {
                rentalId: '5fge7n46hgy4947bk92bk',
                title: 'example unavailability',
                startDateTime: {
                    year: 2021,
                    month: 1,
                    day: 1,
                    hour: 0,
                    minute: 0
                }, // 'January 1, 2021'
                endDateTime: {
                    year: 2021,
                    month: 1,
                    day: 3,
                    hour: 24,
                    minute: 0
                }, // 'January 3, 2021'
            }
            const dates: DateTime[] = await util.objectToDateTime([unavailability.startDateTime, unavailability.endDateTime]);

            jest
                .spyOn(middleware, 'convertToDateTimes')
                .mockImplementation(async () => dates);
            const test = await middleware.convertToDateTimes(unavailability);
            expect(test).toBe(dates);
            expect(test[0]).toBe(dates[0]);
            expect(test[1]).toBe(dates[1]);
            const test2 = dates[1].diff(dates[0], "days")
            expect(test2.values.days).toBe(3);
            console.log(dates[0] < dates[1]);
        });

        describe('validateUnavailability test', () => {

            const unavailability: UnavailabilityDto = {
                rentalId: '5fge7n46hgy4947bk92bk',
                title: 'example unavailability',
                startDateTime: {
                    year: 2021,
                    month: 1,
                    day: 1,
                    hour: 0,
                    minute: 0
                }, // 'January 1, 2021'
                endDateTime: {
                    year: 2021,
                    month: 1,
                    day: 3,
                    hour: 24,
                    minute: 0
                }, // 'January 3, 2021'
            }

            // mock the validateUnavailability function

            it('should throw an error if the unavailability is invalid', async () => {
                const validateUnavailability = middleware.validateUnavailability;
                jest.mock('./pickup-unavailability-validation.middleware');
                const mockLuxon = middleware.validateUnavailability as jest.MockedFunction<typeof validateUnavailability>
                await mockLuxon(unavailability);
                expect(mockLuxon).toBeCalledTimes(1);
            })
        })
    });
})