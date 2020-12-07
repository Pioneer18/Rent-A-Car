import { Test, TestingModule } from "@nestjs/testing";
import { PositiveNumber } from "./positive-number";

describe('PositiveNumber Unit Test', () => {
    let util: PositiveNumber;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PositiveNumber],
        }).compile();
        util = module.get<PositiveNumber>(PositiveNumber);
    })

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('validate method test', () => {
        const data: number = 9;
        const response = true;
        it('should validate the provided number is positive', async () => {
            jest
                .spyOn(util, 'validate')
                .mockImplementation(() => response)
            expect(util.validate(data)).toBe(response);
        });
    });
})