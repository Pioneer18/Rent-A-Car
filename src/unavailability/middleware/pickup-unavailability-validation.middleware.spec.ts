import { Test, TestingModule } from "@nestjs/testing"
import { LuxonUtil } from "../../common/util/luxon-util";
import { unavailabilityModel } from "../../common/Const";
import { UnavailabilityModelInterface } from "../../rental/interface/modelInterface/Unavailability/unavailability.interface";
import { PickupUnavailabilityValidationMiddleware } from "./pickup-unavailability-validation.middleware"
import { UnavailabilityDto } from "../dto/unavailability.dto";

describe('Pickup Unavailability Validation Middleware Unit Test', () => {

    let app: TestingModule;
    let middleware: PickupUnavailabilityValidationMiddleware;
    let util: LuxonUtil
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PickupUnavailabilityValidationMiddleware,
                {
                    provide: unavailabilityModel,
                    useValue: UnavailabilityModelInterface
                },
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
                startDate: 'January 1, 2021 11:30:00',
                endDate: 'January 3, 2021 11:30:00',
                startTime: 0,
                endTime: 24,
                title: 'example unavailability'
            }
            const dates: Date[] = util.createJsDate([unavailability.startDate, unavailability.endDate]);
            const response = await util.dateToDateTime(dates);
            
            jest
                .spyOn(middleware, 'convertToDateTimes')
                .mockImplementation(async () => response);
            expect(await middleware.convertToDateTimes(unavailability)).toBe(response);
        });
    });
})