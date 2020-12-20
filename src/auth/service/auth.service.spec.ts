import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { Request} from "express";
import { UserInterface } from "src/user/interface/user.interface";
import { AppConfigModule } from "../../config/configuration.module";
import { AppConfigService } from "../../config/configuration.service";
import { EmailService } from "../../email/email.service";
import { RedisModule } from "../../redis/redis.module";
import { UserModule } from "../../user/user.module";
import { jwtConstants } from "../constant";
import { LoggedOutGuard } from "../guards/logged-out.guard";
import { ChangePasswordInterface } from "../interfaces/service/change-password.interface";
import { ForgotPasswordInterface } from "../interfaces/service/forgot-password.interface";
import { ValidateUserReturn } from "../interfaces/service/validate-user-return.interface";
import { ValidateUserInterface } from "../interfaces/service/validate-user.interface";
import { ExtractKeyValueUtilInterface } from "../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { LocalStrategy } from "../strategies/local.strategy";
import { ExtractKeyValueUtil } from "../util/extract-key-value.util";
import { VerifyNewPasswordUtil } from "../util/verify-new-password.util";
import { AuthService } from "./auth.service"

describe('Auth Service', () => {

    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule,
                ConfigModule,
                UserModule,
                PassportModule,
                RedisModule,
                JwtModule.register({
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: `${jwtConstants.jwt_exp_time}s` }
                }),
                MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
                    useNewUrlParser: true,
                }),
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
        }).compile()
        service = module.get<AuthService>(AuthService);
    })

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(service).toBeDefined();
        })
    })

    describe('validateUser method test', () => {
        const data: ValidateUserInterface = {
            email: "fake.email@gmail.com",
            pass: "super-secret-password",
        };
        const response: ValidateUserReturn = {
            _id: "5fc421feab08792888915744",
            username: "fake_user",
            email: "fake.email@gmail.com",
            __v: 0
        }
        it('should find the user in the database and authenticate their access to the application', async () => {
            jest
                .spyOn(service, 'validateUser')
                .mockImplementation(async () => response);
            expect(await service.validateUser(data)).toBe(response);
        });
    });

    describe('login', () => {
        const data: UserInterface = {
            username: "fake_user",
            email: "fake.email@gmail.com",
            password: "super-secret-password",
        };
        const mockCookie: string = 'Authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
        it('should return a JWT inside of a Cookie to Authenticate and login the user', async () => {
            jest
                .spyOn(service, 'login')
                .mockImplementation(async () => mockCookie);
            expect(await service.login(data)).toBe(mockCookie);
        });
    });

    describe('logout method test', () => {
        let req: Request;
        const response: ExtractKeyValueUtilInterface = {
            key: 'CAJ.R89F',
            jwt: '870GQRUBAFN-.......HFLAUBRFWA43T9HCAJ.R89F', 
        };
        it('should logout the user by adding their JWT to a Redis `dead-list` for logged out users', async () => {
            jest
                .spyOn(service, 'logout')
                .mockImplementation(async () => response);
            expect(await service.logout(req)).toBe(response);
        });
    });

    describe('changePassword method test', () => {
        const data: ChangePasswordInterface = {
            newPassword: 'bleeh',
            confirmPassword: 'bleeh'
        };
        let req: Request;
        it('should change the password and log the user out', async () => {
            jest
                .spyOn(service, 'changePassword')
                .mockImplementation(async () => {})
            expect(await service.changePassword(data, req)).toBeUndefined()
        });
    });

    describe('forgotPassword method test', () => {
        const data: ForgotPasswordInterface = {
            email: 'fake.email@gmail.com',
        };
        const response: string = ""
        it('should the user a reset password email', async () => {

        })
    })

})