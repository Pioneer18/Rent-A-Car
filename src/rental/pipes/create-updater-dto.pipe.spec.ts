import { ValidatedUnavailabilityDto } from '../dto/unavailability/validated-unavailability.dto';
import { ValidateUpdateUnavailabilityDto } from '../dto/unavailability/validate-update-unavailability.dto';
import { TestingModule, Test } from '@nestjs/testing';
import { CreateUpdaterDtoPipe } from './create-updater-dto.pipe';
import { Logger } from '@nestjs/common';

describe('CreateUpdaterDtoPipe Unit Test', () => {
    let app: TestingModule;
    let pipe: CreateUpdaterDtoPipe;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateUpdaterDtoPipe],
        }).compile();
        app = module;
        pipe = module.get<CreateUpdaterDtoPipe>(CreateUpdaterDtoPipe);
    });
    describe('transform method test', () => {
        it('should accept a ValidateUpdateUnavailabilityDto and return an UpdateUnavailabilityDto', () => {
            const validateUpdateUnavailabilityDto: ValidateUpdateUnavailabilityDto = {
                unavailabilityId: 'xxx365',
                rentalId: 'xxx149',
                y1: {
                    sD: 33,
                    eD: 44,
                },
                y2: null,
                newStart: 0,
                newEnd: 24,
                newTitle: 'Testing',
            };
            const test = pipe.transform(validateUpdateUnavailabilityDto);
            Logger.log(test);
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
