import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ExtractKeyValueUtil } from '../../auth/util/extract-key-value.util';
import { VerifyNewPasswordUtil } from '../../auth/util/verify-new-password.util';
import { AppConfigModule } from '../../config/configuration.module';
import { RedisModule } from '../../redis/redis.module';
import { RedisService } from '../../redis/service/redis.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { FindUserDto } from '../dto/find-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModelInterface } from '../interface/modelInterface/user-model.interface';
import { UserInterface } from '../interface/user.interface';
import { UserSchema } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
        RedisModule,
        AppConfigModule
      ],
      controllers: [UserController],
      providers: [UserService, ExtractKeyValueUtil, VerifyNewPasswordUtil, RedisService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('definition test', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('createProfile method test', () => {
    const user: CreateUserDto = {
      username: 'fake_user',
      email: 'fake.emai@gmail.com',
      password: 'super-secret-password'
    };
    const response: UserInterface = {
      "_id": "5fcd1a191bf9391e74a7c6f5",
      "username": "fake_user2",
      "email": "fake.email2@gmail.com",
      "password": "$2b$10$cemuQfcnf4pqX5Nk0wA7FOmZdGzPpQmK5QCZAI5EMf6abeOCWPg.6",
      "__v": 0
    };
    it('should create a new user profile', async () => {
      jest
        .spyOn(controller, 'createProfile')
        .mockImplementation(async () => response);
      expect(await controller.createProfile(user)).toBe(response);
    });
  });

  describe('updateProfile method test', () => {
    const data: UpdateUserDto = {
      username: "Admin"
    };
    let req: Request;
    const response: UserInterface = {
      _id: "5fb00c20ef7f512e4cbac459",
      username: "Admin",
      email: "finn-the-human@gmail.com",
      password: "2b$10$WerVZ/9SIQPaUv3VXTcjgO.SiYNzXG3.xFdmtzID0.wWnJ1oBN0qS",
      __v: 0,
      resetPasswordExpires: "2020-11-15T00:38:29.426Z",
      resetPasswordToken: "bf230107202b7c641332e2fb41f973cc26d82aa0",
    };
    it('should update a user`s profile data', async () => {
      jest
        .spyOn(controller, 'updateProfile')
        .mockImplementation(async () => response)
      expect(await controller.updateProfile(data, req)).toBe(response);
    });
  });

  describe('findUser method test', () => {
    const data: FindUserDto = {
      email: 'finn-the-human@gmail.com'
    }
    const response: any = { // UserModelInterface, using any for testing
      "_id": "5fb00c20ef7f512e4cbac459",
      "username": "Admin",
      "email": "finn-the-human@gmail.com",
      "password": "$2b$10$WerVZ/9SIQPaUv3VXTcjgO.SiYNzXG3.xFdmtzID0.wWnJ1oBN0qS",
      "__v": 0,
      "resetPasswordExpires": "2020-11-15T00:38:29.426Z",
      "resetPasswordToken": "bf230107202b7c641332e2fb41f973cc26d82aa0"
    }
    it('should find a user by email', async () => {
      jest
        .spyOn(controller, 'findUser')
        .mockImplementation(async () => response);
      expect(await controller.findUser(data)).toBe(response);
    });
  });

  describe('deleteProfile method test', () => {
    const data: DeleteUserDto = {
      password: 'huntress-wiz'
    };
    let req: Request;
    const response: UserInterface = {
      "_id": "5fcd1a191bf9391e74a7c6f5",
      "username": "fake_user2",
      "email": "fake.email2@gmail.com",
      "password": "$2b$10$cemuQfcnf4pqX5Nk0wA7FOmZdGzPpQmK5QCZAI5EMf6abeOCWPg.6",
      "__v": 0
    }
    it('should delete a user profile', async () => {
      jest
        .spyOn(controller, 'deleteProfile')
        .mockImplementation(async () => response);
      expect(await controller.deleteProfile(data, req)).toBe(response);
    });
  });

});
