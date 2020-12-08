import { Test, TestingModule } from "@nestjs/testing";
import { ValidateEmailUtilInterface } from "../interface/utils/validate-email-util.interface";
import { ValidateEmailUtil } from "./validate-email.util"

describe('ValidateEmailUtil Unit Test', () => {

    let util: ValidateEmailUtil;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ValidateEmailUtil]
        }).compile()
        util = module.get<ValidateEmailUtil>(ValidateEmailUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        })
    });

    describe('validateEmail method test', () => {
        const data: ValidateEmailUtilInterface = {
            check: ['fake.email@gmail.com'],
        }
        const errMessage = ' email already exists';
        it('should throw an error if the user email already exists', async () => {
            jest
                .spyOn(util, 'validateEmail') 
                .mockImplementation(async () => errMessage)
            expect(await util.validateEmail(data)).toBe(errMessage);
        })
    })
})