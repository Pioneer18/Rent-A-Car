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
import {RentalIdParamDto} from '../dto/rental-id-param.dto'
import { RetrievedImagesInterface } from '../interfaces/service/retrieved-images.interface';

describe('Images Controller', () => {
  let controller: ImagesController;
  let app: TestingModule;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema}]),
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
    const params: RentalIdParamDto  = {rental_id: '5fc575be2de5f937487a0994'};
    let response: Response;
    it('should upload a single or multiple rental photos to be saved', async () => {
      jest
        .spyOn(controller,'uploadRentalImages')
        .mockImplementation(async () => response)
      expect(await controller.uploadRentalImages(req, res, params)).toBe(response)
    })
  })

  describe('uploadProfileImage method test', () => {
    let req: Request;
    let res: Response;
    const params: RentalIdParamDto  = {rental_id: '5fc575be2de5f937487a0994'};
    let response: Response;
    it('should upload a single or multiple profile photos to be saved', async () => {
      jest
        .spyOn(controller,'uploadProfileImage')
        .mockImplementation(async () => response)
      expect(await controller.uploadProfileImage(req, res, params)).toBe(response)
    })
  })

  describe('findRentalImages method test', () => {
    const params: RentalIdParamDto  = {rental_id: '5fc575be2de5f937487a0994'};
    let req: Request;
    /*let response: RetrievedImagesInterface = {
      count: 2,
      images: [
        {
          
        }
      ]
    }*/
    it('should find all of a rentals images', async () => {
      
    })
  })

  describe('findRentalImage method test', () => {
    it('should be...', async () => {
      
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
