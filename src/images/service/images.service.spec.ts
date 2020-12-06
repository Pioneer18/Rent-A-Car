import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/configuration.service';
import { AppConfigModule } from '../../config/configuration.module';
import { DatabaseModule } from '../../database/database.module';
import { S3Provider } from '../providers/s3.provider';
import { ImageSchema } from '../schema/images.schema';
import { CreateMulterUploadUtil } from '../util/create-multer-upload.util';
import { DeleteS3ImagesUtil } from '../util/delete-s3-images.util';
import { MulterUploadUtil } from '../util/multer-upload.util';
import { ProcessSaveDataUtil } from '../util/process-save-data.util';
import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema}]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
        AppConfigModule,
        DatabaseModule
    ],
      providers: [
        AppConfigService,
        ImagesService,
        ProcessSaveDataUtil,
        CreateMulterUploadUtil,
        MulterUploadUtil,
        DeleteS3ImagesUtil,
        S3Provider
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
