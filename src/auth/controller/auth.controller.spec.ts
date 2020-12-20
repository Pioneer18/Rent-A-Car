import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { response, Response } from "express";
import { UserSchema } from "src/user/schema/user.schema";
import { AppConfigModule } from "../../config/configuration.module";
import { AppConfigService } from "../../config/configuration.service";
import { EmailService } from "../../email/email.service";
import { RedisModule } from "../../redis/redis.module";
import { UserModule } from "../../user/user.module";
import { jwtConstants } from "../constant";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { LoggedOutGuard } from "../guards/logged-out.guard";
import { ExtractKeyValueUtilInterface } from "../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface";
import { AuthService } from "../service/auth.service";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { LocalStrategy } from "../strategies/local.strategy";
import { ExtractKeyValueUtil } from "../util/extract-key-value.util";
import { VerifyNewPasswordUtil } from "../util/verify-new-password.util";
import { AuthController } from "./auth.controller"

describe('Auth Controller', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule,
                // MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
                MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
                useNewUrlParser: true,
                }),
                ConfigModule,
                UserModule,
                PassportModule,
                RedisModule,
                JwtModule.register({
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: `${jwtConstants.jwt_exp_time}s` }
                })
            ],
            providers: [
                AuthService,
                LocalStrategy,
                JwtStrategy,
                LoggedOutGuard,
                ExtractKeyValueUtil,
                VerifyNewPasswordUtil,
                EmailService,
                AppConfigService
            ],
            exports: [ AuthService, LoggedOutGuard, ExtractKeyValueUtil, VerifyNewPasswordUtil],
            controllers: [AuthController]
        }).compile()
        controller = module.get<AuthController>(AuthController);
    });

    describe('Auth Controller definition test', () => {
        it('should be defined', async () => {
            expect(controller).toBeDefined();
        });
    });

    describe('login method test', () => {
        let req
        let res: Response;
        it('should authenticate and login a user', async () => {
            jest
                .spyOn(controller, 'login')
                .mockImplementation(async () => res)
            expect(await controller.login(req, res)).toBe(res)
        })
    })

    describe('logout method test', () => {
        let req
        const response: ExtractKeyValueUtilInterface = {
            jwt: '954fakejwt0001',
            key: 'ejwt0001'
        }
        it('should logout a user by adding their JWT to a Reids `dead-list` of unauthorized JWTs', async () => {
            jest
                .spyOn(controller, 'logout')
                .mockImplementation(async () => response)
            expect(await controller.logout(req)).toBe(response);
        })
    })

    describe('changePassword method test', () => {
        const data: ChangePasswordDto = {
            newPassword: 'dragon-ball',
            confirmPassword: 'dragon-ball'
        }
        let req: any;
        it('should change the password to the new password submitted by the user', async () => {
            jest
                .spyOn(controller, 'changePassword')
                .mockImplementation(async () => {})
            expect(await controller.changePassword(req, data)).toBeUndefined()
        })
    })

    describe('forgotPassword method test', () => {
        const data: ForgotPasswordDto = {
            email: 'fake.email@gmail.com'
        }
        const response: string = '00_MOCK_RESET_TOKEN_00'
        it('should send an email with a reset-passowrd-token for restting the forgotten password', async () => {
            jest
                .spyOn(controller, 'forgotPassword')
                .mockImplementation(async () => response)
            expect(await controller.forgotPassword(data)).toBe(response);
        })
    })

    describe('resetPassword method test', () => {
        const data: ResetPasswordDto = {
            resetPass: 'NewPass',
            confirmPass: 'NewPass',
            resetPasswordToken: '00_MOCK_RESET_TOKEN_00'
        }
        it('should...', async () => {
            jest
                .spyOn(controller, 'resetPassword')
                .mockImplementation(async () => {})
            expect(await controller.resetPassword(data)).toBeUndefined();
        })
    })

})