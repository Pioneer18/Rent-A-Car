import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '../../config/configuration.module';
import { AppConfigService } from '../../config/configuration.service';
import { DatabaseModule } from '../../database/database.module';
import { S3Provider } from '../providers/s3.provider';
import { ImageSchema } from '../schema/images.schema';
import { ImagesService } from '../service/images.service';
import { CreateMulterUploadUtil } from '../util/create-multer-upload.util';
import { DeleteS3ImagesUtil } from '../util/delete-s3-images.util';
import { MulterUploadUtil } from '../util/multer-upload.util';
import { ProcessSaveDataUtil } from '../util/process-save-data.util';
import { ImagesController } from './images.controller';
import { Request, Response } from 'express';
import { RetrievedImagesInterface } from '../interfaces/service/retrieved-images.interface';
import { RentalIdParamsDto } from '../dto/rental-id-params.dto';
import { ImageDto } from '../dto/image.dto';

describe('Images Controller', () => {
  let controller: ImagesController;
  let app: TestingModule;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
        AppConfigModule
      ],
      controllers: [ImagesController],
      providers: [
        ImagesService,
        AppConfigService,
        ProcessSaveDataUtil,
        S3Provider,
        CreateMulterUploadUtil,
        MulterUploadUtil,
        DeleteS3ImagesUtil
      ],
      exports: [ImagesService]
    }).compile();
    app = module;
    controller = app.get<ImagesController>(ImagesController);
  });

  describe('Images Controller definition test', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('uploadRentalImages method test', () => {
    let req: Request;
    let res: Response;
    const params = { rental_id: '5fc575be2de5f937487a0994' };
    let response: Response;
    it('should upload a single or multiple rental photos to be saved', async () => {
      jest
        .spyOn(controller, 'uploadRentalImages')
        .mockImplementation(async () => response)
      expect(await controller.uploadRentalImages(req, res, params)).toBe(response)
    })
  })

  describe('uploadProfileImage method test', () => {
    let req: Request;
    let res: Response;
    const params: RentalIdParamsDto = { rental_id: '5fc575be2de5f937487a0994' };
    let response: Response;
    it('should upload a single or multiple profile photos to be saved', async () => {
      jest
        .spyOn(controller, 'uploadProfileImage')
        .mockImplementation(async () => response)
      expect(await controller.uploadProfileImage(req, res)).toBe(response)
    })
  })

  describe('findRentalImages method test', () => {
    const params: RentalIdParamsDto = { rental_id: '5fc6d650bb68d13acc9c1117' };
    let req: Request;
    const response: RetrievedImagesInterface = {
      "count": 2,
      "images": [
        {
          "_id": "5fc6d91abb68d13acc9c1118",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225729-tesla_roadster.jpg",
          "etag": "ad8a5d88226f409298f232b14de8aead",
          "category": "rentals",
          "size": 86997,
          "location": "fake_AWS_image_location",
          "__v": 0
        },
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "896fcaae0a68dab9a296d4643e37c454",
          "category": "rentals",
          "size": 86628,
          "location": "fake_AWS_image_location",
          "__v": 0
        }
      ]
    }
    it('should find all of a rentals images', async () => {
      jest
        .spyOn(controller, 'findRentalImages')
        .mockImplementation(async () => response)
      expect(await controller.findRentalImages(params, req)).toBe(response);
    })
  })

  describe('findRentalImage method test', () => {
    const params: ImageDto = { _id: '5fc6d650bb68d13acc9c1117' };
    let req: Request;
    const response: RetrievedImagesInterface = {
      "count": 1,
      "images": {
        "_id": "5fc6d91abb68d13acc9c1119",
        "user_id": "5fc421feab08792888915744",
        "rental_id": "5fc6d650bb68d13acc9c1117",
        "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
        "key": "1606867225735-cyber_truck.jpg",
        "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
        "category": "rentals",
        "size": 86628,
        "location": "https://rent-a-car-photos.s3.us-east-2.amazonaws.com/fake.email%40gmail.com/rentals/1606867225735-cyber_truck.jpg",
        "__v": 0
      }
    }
    it('should be...', async () => {
      jest
        .spyOn(controller, 'findRentalImage')
        .mockImplementation(async () => response);
      expect(await controller.findRentalImage(params, req))
    })
  })

  describe('findProfileImages method test', () => {
    it('should be...', async () => {

    })
  })

  describe('findProfileImage method test', () => {
    it('should be...', async () => {

    })
  })

  describe('deleteRentalImages method test', () => {
    it('should be...', async () => {

    })
  })

  describe('deleteAllRentalImages method test', () => {
    it('should be...', async () => {

    })
  })

  describe('deleteAllProfileImages method test', () => {
    it('should be...', async () => {

    })
  })

  afterAll(async () => {
    await app.close()
  });
});
