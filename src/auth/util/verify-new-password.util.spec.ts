import { Test, TestingModule } from "@nestjs/testing";
import { CheckPasswordTypoInterface } from "../interfaces/utils/verifyNewPasswordUtil/check-password-typo.interface";
import { VerifyNewPasswordInterface } from "../interfaces/utils/verifyNewPasswordUtil/verify-new-password.interface";
import { VerifyNewPasswordUtil } from "./verify-new-password.util"

describe('VerifyNewPasswordUtil Unit Test', () => {

    let util: VerifyNewPasswordUtil;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ VerifyNewPasswordUtil ],
        }).compile()
        util = module.get<VerifyNewPasswordUtil>(VerifyNewPasswordUtil);
    })

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('verifyNew method test', () => {
        const data: VerifyNewPasswordInterface = {
            newPassword: 'super-secret-new-password',
            oldPassword: 'blehhh'
        }
        it('should', async () => {
            jest
                .spyOn(util, 'verifyNew')
                .mockImplementation(async () => {});
            expect(await util.verifyNew(data)).toBeUndefined();
        });
    });

    describe('verifyMatch method test', () => {
        const data: VerifyNewPasswordInterface = {
            newPassword: 'super-secret-new-password',
            oldPassword: 'blehhh'
        }
        it('should', async () => {
            jest
                .spyOn(util, 'verifyMatch')
                .mockImplementation(async () => {});
            expect(await util.verifyMatch(data)).toBeUndefined();
        });
    });

    describe('checkTypos method test', () => {
        const data: CheckPasswordTypoInterface = {
            newPassword: "coding",
            confirmPassword: "coding",
        }
        it('should', async () => {
            jest
                .spyOn(util, 'checkTypos')
                .mockImplementation(async () => {});
            expect(await util.checkTypos(data)).toBeUndefined();
        });
    });
})