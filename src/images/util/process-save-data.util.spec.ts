import { Test, TestingModule } from "@nestjs/testing";
import { rentals } from "../../common/Const";
import { SaveImagesInterface } from "../interfaces/service/save-images.interface";
import { ProcessedSaveDataInterface } from "../interfaces/utils/processSaveData/processed-save-data.interface";
import { ProcessSaveDataUtil } from "./process-save-data.util"

describe('ProcessSaveDataUtil Unit Test', () => {
    let util: ProcessSaveDataUtil;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProcessSaveDataUtil,
            ],
        }).compile()
        util = module.get<ProcessSaveDataUtil>(ProcessSaveDataUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('process method test', () => {
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
        const response: ProcessedSaveDataInterface = {
            image: {
                _id: '028hp92rb9-2rb2-9rb230uf',
                user_id: '28hr-983hr-239723gr239rg8h',
                rental_id: '98qrh-92rh2=rh239-32r98h0',
                bucket: 'rentals',
                key: '209rh2038h23p9r23',
                etag: "803282309202rh80f00909f09fff",
                category: rentals,
                size: 7209000,
                location: 'Fake_AWS_Image_Location',
                __v: 0
            },
            packet: null,
        }
        it('should crate a new Image Document or an array of Image Documetns to be saved', async () => {
            jest
                .spyOn(util, 'process')
                .mockImplementation(async () => response);
            expect(await util.process(data)).toBe(response);
        })
    })
})
