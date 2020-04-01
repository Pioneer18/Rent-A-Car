import { TestingModule, Test } from '@nestjs/testing';
import { TypeOfValue } from './typeof-value';

describe('TypeOfValue Unit Test', () => {
    let app: TestingModule;
    let typ: TypeOfValue;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TypeOfValue],
        }).compile();
        app = module;
        typ = module.get<TypeOfValue>(TypeOfValue);
    });

    describe('test', () => {
        it('should return false if value does not match expected', async () => {
            const value = 'hello';
            const test = await typ.validate(value, 'number');
            expect(test).toBe(false);
        });
    });

    afterAll(async () => {
        app.close();
    });
});
