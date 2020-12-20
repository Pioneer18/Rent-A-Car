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
import { FindRentalImagesInterface } from '../interfaces/service/find-rental-images.interface';
import { RetrievedImagesInterface } from '../interfaces/service/retrieved-images.interface';
import { SaveImagesInterface } from '../interfaces/service/save-images.interface';
import { FindProfileImageInterface } from '../interfaces/service/find-profile-image.interface';
import { DeleteImagesInterface } from '../interfaces/service/delete-images.interface';
import { DeleteResponseInterface } from '../../common/interfaces/delete-response.interface';
import { DeleteAllImagesInterface } from '../interfaces/service/delete-all-images.interface';
import { FileUploadAndSaveInterface } from '../interfaces/service/fileupload-and-save.interface';
describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema }]),
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

  describe('saveImages method test', () => {
    const data: SaveImagesInterface = {
      files: [
        {
          "fieldname": "upload",
          "originalname": "tesla_roadster.jpg",
          "encoding": "7bit",
          "mimetype": "image/jpeg",
          "size": 86997,
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1607227143753-tesla_roadster.jpg",
          "acl": "public-read",
          "contentType": "application/octet-stream",
          "contentDisposition": null,
          "storageClass": "STANDARD",
          "serverSideEncryption": null,
          "metadata": null,
          "location": "fake_AWS_iamge_location",
          "etag": "\"ad8a5d88226f409298f232b14de8aead\""
        },
        {
          "fieldname": "upload",
          "originalname": "cyber_truck.jpg",
          "encoding": "7bit",
          "mimetype": "image/jpeg",
          "size": 86628,
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1607227143763-cyber_truck.jpg",
          "acl": "public-read",
          "contentType": "application/octet-stream",
          "contentDisposition": null,
          "storageClass": "STANDARD",
          "serverSideEncryption": null,
          "metadata": null,
          "location": "fake_AWS_image_location",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\""
        }
      ],
      user_id: '5fc421feab08792888915744',
      rental_id: '5fc6d650bb68d13acc9c1117',
      category: 'rentals'
    }
    const response: any = { // using any but the real function uses ImageModelInterface
      _id: "5fc6d91abb68d13acc9c1119",
      user_id: "5fc421feab08792888915744",
      rental_id: "5fc6d650bb68d13acc9c1117",
      bucket: "rent-a-car-photos/fake.email@gmail.com/rentals",
      key: "1606867225735-cyber_truck.jpg",
      etag: "896fcaae0a68dab9a296d4643e37c454",
      category: "rentals",
      size: 86628,
      location: "https://rent-a-car-photos.s3.us-east-2.amazonaws.com/fake.email%40gmail.com/rentals/1606867225735-cyber_truck.jpg",
      __v: 0
    }
    it('should save AWS uploaded images to the database', async () => {
      jest
        .spyOn(service, 'saveImages')
        .mockImplementation(async () => response)
      expect(await service.saveImages(data)).toBe(response);
    })
  })

  describe('findRentalImages method test', () => {
    const data1: FindRentalImagesInterface = {
      img_id: "fakeid",
      rental_id: "5fc6d650bb68d13acc9c1117",
      user: {
        username: "fake_user",
        email: "fake.email@gmail.com",
        userId: "5fc421feab08792888915744",
      }
    }
    const data2: FindRentalImagesInterface = {
      img_id: null,
      rental_id: "5fc6d650bb68d13acc9c1117",
      user: {
        username: "fake_user",
        email: "fake.email@gmail.com",
        userId: "5fc421feab08792888915744",
      }
    }
    const response1: RetrievedImagesInterface = {
      "count": 1,
      "images": [
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "rentals",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        }
      ]
    }
    const response2: RetrievedImagesInterface = {
      "count": 2,
      "images": [
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "rentals",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        },
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "rentals",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        },
      ]
    }
    it('should query multiple rental images and return them', async () => {
      jest
        .spyOn(service, 'findRentalImages')
        .mockImplementation(async () => response2)
      expect(await service.findRentalImages(data2)).toBe(response2);
    })

    it('should query a specific rental image and return it', async () => {
      jest
        .spyOn(service, 'findRentalImages')
        .mockImplementation(async () => response1)
      expect(await service.findRentalImages(data1)).toBe(response1)
    })
  })

  describe('findProfileImages method test', () => {
    const data1: FindProfileImageInterface = {
      user: {
        username: "fake_user",
        userId: "5fc421feab08792888915744",
        email: "fake.email@gmail.com"
      },
      img_id: "5fc6d91abb68d13acc9c1119"
    }
    const data2: FindProfileImageInterface = {
      user: {
        username: "fake_user",
        userId: "5fc421feab08792888915744",
        email: "fake.email@gmail.com"
      },
      img_id: null
    }
    const response1: RetrievedImagesInterface = {
      "count": 1,
      "images": [
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "rentals",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        }
      ]
    }
    const response2: RetrievedImagesInterface = {
      "count": 2,
      "images": [
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "profile",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        },
        {
          "_id": "5fc6d91abb68d13acc9c1119",
          "user_id": "5fc421feab08792888915744",
          "rental_id": "5fc6d650bb68d13acc9c1117",
          "bucket": "rent-a-car-photos/fake.email@gmail.com/rentals",
          "key": "1606867225735-cyber_truck.jpg",
          "etag": "\"896fcaae0a68dab9a296d4643e37c454\"",
          "category": "profile",
          "size": 86628,
          "location": "fake_AWS_image_location_url",
          "__v": 0
        },
      ]
    }
    it('should query mutltiple images and return an array with more than one', async () => {
      jest
        .spyOn(service, 'findProfileImages')
        .mockImplementation(async () => response1)
      expect(await service.findProfileImages(data1)).toBe(response1);
    })

    it('should query a specific profile image and return it', async () => {
      jest
        .spyOn(service, 'findProfileImages')
        .mockImplementation(async () => response2)
      expect(await service.findProfileImages(data2)).toBe(response2);
    })
  })

  describe('deleteImages method test', () => {
    const data: DeleteImagesInterface = {
      images: [
        {
          _id: "5fc6d91abb68d13acc9c1119",
          location: "fake_AWS_image_location"
        }
      ],
      user: {
        username: "fake_user",
        email: "fake.email@gmail.com",
        userId: "5fc421feab08792888915744"
      }
    }
    const response: DeleteResponseInterface = {
      "n": 1,
      "opTime": {
        "ts": 6902971751387365377,
        "t": 7
      },
      "electionId": "7fffffff0000000000000007",
      "ok": 1,
      "$clusterTime": {
        "clusterTime": "6902971751387365377",
        "signature": {
          "hash": "45kr8AZX4hbr/jLV+rsXf3bSp2Q=",
          "keyId": "6888134215632683011"
        }
      },
      "operationTime": "6902971751387365377",
      "deletedCount": 1
    }
    it('should delete a single image from the S3 Bucket and the database', async () => {
      jest
        .spyOn(service, 'deleteImages')
        .mockImplementation(async () => response)
      expect(await service.deleteImages(data)).toBe(response);
    })

    
  })

  describe('deleteAllImages method test', () => {
    const data: DeleteAllImagesInterface = {
      user: {
        username: "fake_user",
        email: "fake.email@gmail.com",
        userId: "5fc421feab08792888915744"
      },
      rental_id: "5fc6d650bb68d13acc9c1117"
    }
    
    const data2: DeleteAllImagesInterface = {
      user: {
        username: "fake_user",
        email: "fake.email@gmail.com",
        userId: "5fc421feab08792888915744"
      }
    }

    const response: DeleteResponseInterface = {
      n: 0,
      ok: 1,
      deletedCount: 0
    }
    it('should delete all of the rental`s images', async () => {
      jest
        .spyOn(service, 'deleteAllImages')
        .mockImplementation(async () => response)
      expect(await service.deleteAllImages(data)).toBe(response);
    })

    it('should delete all of the user`s profile images', async () => {
      jest
        .spyOn(service, 'deleteAllImages')
        .mockImplementation(async () => response)
      expect(await service.deleteAllImages(data2)).toBe(response)
    })
  })

  describe('fileuploadAndSave method test', () => {
    const data: FileUploadAndSaveInterface = {
      req: {},
      res: {},
      category: 'rentals',
      rental_id: '5fc6d650bb68d13acc9c1117'
    }
    const response: any = 'files were uploaded :)'
    it('should send the file(s) to the S3 bucket and save the returned data', async () => {
      jest
        .spyOn(service, 'fileuploadAndSave')
        .mockImplementation(async () => response)
      expect(await service.fileuploadAndSave(data)).toBe(response);
    })
  })
});
