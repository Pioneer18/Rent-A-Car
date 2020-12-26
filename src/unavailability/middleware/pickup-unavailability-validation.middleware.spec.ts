import { Test, TestingModule } from "@nestjs/testing"
import { LuxonUtil } from "../../common/util/luxon-util";
import { unavailabilityModel } from "../../common/Const";
import { UnavailabilityModelInterface } from "../../rental/interface/modelInterface/Unavailability/unavailability.interface";
import { PickupUnavailabilityValidationMiddleware } from "./pickup-unavailability-validation.middleware"

describe('Pickup Unavailability Validation Middleware Unit Test', () => {

    let app: TestingModule;
    let middleware: PickupUnavailabilityValidationMiddleware;
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
        }).compile()
        app = module;
        middleware = module.get<PickupUnavailabilityValidationMiddleware>(PickupUnavailabilityValidationMiddleware);
    });

    describe('PickupUnavailabilityValidationMiddleware definition test', () => {
        it('should be defined', async () => {
            expect(middleware).toBeDefined();
        })
    })
})