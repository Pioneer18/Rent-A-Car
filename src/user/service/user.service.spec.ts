import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateQuery } from 'mongoose';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { VerifyNewPasswordUtil } from '../../auth/util/verify-new-password.util';
import { RedisModule } from '../../redis/redis.module';
import { UserController } from '../controller/user.controller';
import { CreateUserInterface } from '../interface/service/create-user.interface';
import { UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';
import { AppConfigModule } from '../../config/configuration.module';
import { DatabaseModule } from '../../database/database.module';
import { FindUserInterface } from '../interface/service/find-user.interface';
import { FindUserByResetPwTokenInterface } from '../interface/service/find-user-by-reset-pw-token.interface';
import { UpdateUserInterface } from '../interface/service/update-user.interface'
import { UserInterface } from '../interface/user.interface';
import { Request } from 'express';
import { DeleteUserInterface } from '../interface/service/delete-user.interface';
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
    const response: any = {
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
    const data: FindUserByResetPwTokenInterface = {
      token: 'ca2edd5699b29762f65b7d77329ee3cc22cdd9d6'
    }
    const response: any = {
      _id: "5fc9860e7ad1de1c4ce3101f",
      username: "Unathi",
      password: "encrypted",
      resetPasswordToken: "5fc9860e7ad1de1c4ce3101f",
      resetPasswordExpires: 3600000
    }
    it('should find a user by their resetPasswordToken once they have submitted the reset password email', async () => {
      jest
        .spyOn(service, 'findUserByResetPasswordToken')
        .mockImplementation(async () => response)
      expect(await service.findUserByResetPasswordToken(data)).toBe(response);
    })
  })

  describe('updateUser method test', () => {
    const data: UpdateUserInterface = {
      username: "Faith",
    }
    let req: Request;
    const response: UserInterface = {
      _id: "5fc9860e7ad1de1c4ce3101f",
      username: "Unathi",
      email: "unathi@gmail.com",
      password: "encrypted",
      resetPasswordToken: null,
      resetPasswordExpires: null,
    }
    it('should update an existing user`s information', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockImplementation(async () => response)
      expect(await service.updateUser(data, req)).toBe(response);
    })
  })

  describe('deleteUser method test', () => {
    const data: DeleteUserInterface = {
      password: 'hectic'
    }
    let req: Request;
    const response: UserInterface = {
      _id: "5fc992f77ad1de1c4ce31020",
      username: "Unathi",
      email: "unathi@gmail.com",
      password: "$2b$10$K.9/byQ9U51LHzx/ZLrU7.Q.F5DI8Lha.zfEECxfloKzoI20X1d0e",
      resetPasswordExpires: null,
      resetPasswordToken: null,
      __v: 0
    }
    it('should delete a user`s account', async () => {
      jest
        .spyOn(service, 'deleteUser')
        .mockImplementation(async () => response)
      expect(await service.deleteUser(data, req)).toBe(response);
    })
  })

  describe('createUserUpdate method test', () => {
    const data: UpdateUserInterface = {
      username: 'Unathi',
      email: 'unathi@gmail.com'
    }
    it('should create a MongoDB update object for updating a user profile', async () => {
      // mock method
      const mockCreateUserUpdate = (data: UpdateUserInterface) => {
        const update: UpdateUserInterface = {};
        data.username ? update.username = data.username : data.username = null;
        data.email ? update.email = data.email : data.email = null;
        return update;
      }
      // test
      const test = await mockCreateUserUpdate(data);
      expect(test).toEqual(expect.objectContaining({
        username: 'Unathi',
        email: 'unathi@gmail.com'
      }))
    })
  })

  afterAll(async () => {
    await app.close();
  });

});
