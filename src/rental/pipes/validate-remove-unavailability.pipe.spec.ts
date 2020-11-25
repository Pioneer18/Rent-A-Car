import { TestingModule, Test } from '@nestjs/testing';
import { ValidateRemoveUnavailabilityPipe } from './validate-remove-unavailability.pipe';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove/remove-unavailability.dto';
import { Logger } from '@nestjs/common';

describe('ValidateRemoveUnavailabilityPipe Unit Test', () => {
    const pipe = (value) => {
        Logger.log('the expected rentalId');
        Logger.log(value.rentalId);
        if (typeof value.rentalId !== 'string') {
            return 'invalid rental ID; must be a string';
        }
        if (typeof value.unavailabilityId !== 'string') {
            return 'invalid unavailability ID; must be a string';
        }
        return 'pass';
    };
    describe('validateDto unit test', () => {
        it('should validate the incoming dto', () => {
            const dto1: RemoveUnavailabilityDto = {
                rentalId: 'xxx149',
                unavailabilityId: 'xxx135',
            };
            const dto2 = {
                rentalId: 'xxx149',
                unavailabilityId: 9007,
            };
            const dto3 = {
                rentalId: 1499,
                unavailabilityId: '9007',
            };
            const pass = pipe(dto1);
            const fail = pipe(dto2);
            const fail2 = pipe(dto3);
            expect(pass).toBe('pass');
            expect(fail).toBe('invalid unavailability ID; must be a string');
            expect(fail2).toBe('invalid rental ID; must be a string');
        });
    });
});
