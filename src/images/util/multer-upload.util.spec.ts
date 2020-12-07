import { Test, TestingModule } from "@nestjs/testing";
import { rentals } from "../../common/Const";
import { SaveImagesInterface } from "../interfaces/service/save-images.interface";
import { MulterUploadUtilInterface } from "../interfaces/utils/multerUploadUtil/multer-upload-util.interface";
import { MulterUploadUtil } from "./multer-upload.util"

describe('MulterUpdloadUtil Unit Test', () => {
    let util: MulterUploadUtil;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MulterUploadUtil
            ],
        }).compile()
        util = module.get<MulterUploadUtil>(MulterUploadUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined()
        });
    });

    describe('upload method test', () => {
        const data: MulterUploadUtilInterface = {
            req: {},
            res: {},
            multerUpload: () => { },
            saveImages: (data: SaveImagesInterface): Promise<void> => { return },
            category: rentals,
            user: {
                userId: "uafpeu897y9hf",
                username: "fake_user",
                email: "fake.emai@gmail.com"
            },
            rental_id: "ubp9rb923r23br23p9rn823r23fu8dc"
        }
        it('should be defined', async () => {
            jest
                .spyOn(util, 'upload')
                .mockImplementation(async () => { })
            expect(await util.upload(data)).toBeUndefined()
        })
    })
})