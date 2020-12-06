import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ExtractKeyValueUtil } from 'src/auth/util/extract-key-value.util';
import { VerifyNewPasswordUtil } from 'src/auth/util/verify-new-password.util';
import { AppConfigModule } from 'src/config/configuration.module';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/service/redis.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserReturnInterface } from '../interface/service/create-user-return.interface';
import { UserSchema } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProfile method test', () => {
    const user: CreateUserDto = {
      username: 'fake_user',
      email: 'fake.emai@gmail.com',
      password: 'super-secret-password'
    }
    const response: CreateUserReturnInterface = {
      "_id": "5fcd1a191bf9391e74a7c6f5",
      "username": "fake_user2",
      "email": "fake.email2@gmail.com",
      "password": "$2b$10$cemuQfcnf4pqX5Nk0wA7FOmZdGzPpQmK5QCZAI5EMf6abeOCWPg.6",
      "__v": 0
    }
    it('should create a new user profile', async () => {
      
    })
  })

  describe('updateProfile method test', () => {
    it('should update a user`s profile data', async () => {

    })
  })

  describe('findUser method test', () => {
    it('should find a user by email', async () => {

    })
  })

  describe('deleteProfile method test', () => {
    it('should delete a user profile', async () => {

    })
  })

});
