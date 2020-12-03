import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuery } from 'mongoose';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { VerifyNewPasswordUtil } from '../../auth/util/verify-new-password.util';
import { RedisModule } from '../../redis/redis.module';
import { UserController } from '../controller/user.controller';
import { CreateUserInterface } from '../interface/service/create-user.interface';
import { CreatedUserInterface } from '../interface/service/created-user.interface';
import { UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';
import { AppConfigModule } from '../../config/configuration.module';
import { DatabaseModule } from '../../database/database.module';
import { FindUserInterface } from '../interface/service/find-user.interface';
import { string } from '@hapi/joi';
describe('UserService', () => {
  let service: UserService;
  let app: TestingModule;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
        DatabaseModule,
        RedisModule,
        AppConfigModule,
      ],
      controllers: [UserController],
      providers: [
        UserService,
        ExtractKeyValueUtil,
        VerifyNewPasswordUtil
      ],
      exports: [UserService, RedisModule]
    }).compile();
    app = module;
    service = module.get<UserService>(UserService);
  });

  describe('UserService definition test', () => {
    it('should be defined', async () => {
      expect(service).toBeDefined();
    });
  })

  describe('createUser method test', () => {
    const user: CreateQuery<CreateUserInterface> = {
      username: 'Unathi',
      email: 'unathi@gmail.com',
      password: 'super-secret-password'
    }
    const response: CreateQuery<CreatedUserInterface> = {
      "_id": "5fc945306f73c1175cd4652e",
      "username": "Unathi",
      "email": "unathi@gmail.com"
    }
    it('should create a new user', async () => {
      jest
        .spyOn(service, 'createUser')
        .mockImplementation(async () => response)
      expect(await service.createUser(user)).toBe(response);
    })
  })

  describe('findUser method test', () => {
    const data: FindUserInterface = {
      email: 'unathi@gmail.com'
    }
    const response: any = {
      _id: "5fc945306f73c1175cd4652e",
      username: "Unathi",
      email: "unathi@gmail.com",
      password: "encrypted",
      resetPasswordToken: null,
      restPasswordExpires: null,
    }
    it('should find a user by email', async () => {
      jest
        .spyOn(service, 'findUser')
        .mockImplementation(async () => response);
      expect(await service.findUser(data)).toBe(response);
    })
  })

  describe('findUserByResetPasswordToken method test', () => {
    it('should find a user by their resetPasswordToken once they have submitted the reset password email', async () => {

    })
  })

  describe('updateUser method test', () => {
    it('should update an existing user`s information', async () => {

    })
  })

  describe('deleteUser method test', () => {
    it('should delete a user`s account', async () => {

    })
  })

  describe('createUserUpdate method test', () => {
    it('should create a MongoDB update object for updating a user profile', async () => {

    })
  })

  describe('logoutUser method test', () => {
    it('should log a user out of the application by adding their JWT to the Redis cache `dead-list`', async () => {

    })
  })

  afterAll(async () => {
    await app.close();
  });

});
