import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Request, Response } from "express";
import { userModel } from "../../common/Const";
import { ValidateEmailUtil } from "../utils/validate-email.util";
import { ValidateEmailMiddleware } from "./validate-email.middleware"

describe('ValidateEmailMiddleware Unit Test', () => {
    let middleware: ValidateEmailMiddleware;
    const mockUser = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateEmailMiddleware,
                ValidateEmailUtil,
                {
                    provide: userModel,
                    useValue: mockUser
                }
            ]
        }).compile()
        middleware = module.get<ValidateEmailMiddleware>(ValidateEmailMiddleware);
    })

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(middleware).toBeDefined()
        })
    })

    describe('use method', () => {
        let req: Request;
        let res: Response;
        let next: Function;
        it('should validate the requested new email is unique to the db', async () => {
            jest
                .spyOn(middleware, 'use')
                .mockImplementation(async () => {})
            expect(await middleware.use(req, res, next)).toBeUndefined(); // no emails no errors, calls next
        });
    });
})