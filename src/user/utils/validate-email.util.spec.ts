import { Test, TestingModule } from "@nestjs/testing";
import { async } from "rxjs/internal/scheduler/async";
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
        expect(util).toBeDefined();
    });

    describe('validateEmail method test', () => {
        const data: ValidateEmailUtilInterface = {
            check: ['fake.email@gmail.com'],
        }
        it('should throw an error if the user email already exists', async () => {
            jest
                .spyOn(util, 'validateEmail') 
                .mockImplementation(async () => { throw new Error('email already exists')})
            expect(util.validateEmail(data)).toThrow(new Error('email already exists'))
        })
    })
})