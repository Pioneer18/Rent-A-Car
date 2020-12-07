import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigModule } from "../../config/configuration.module";
import { DeleteS3ImageInterface } from "../interfaces/utils/deleteS3ImagesUtil/delte-s3-image.interface";
import { S3Provider } from "../providers/s3.provider";
import { DeleteS3ImagesUtil } from "./delete-s3-images.util"

describe('deleteS3Image Unit Test', () => {
    let util: DeleteS3ImagesUtil;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule
            ],
            providers: [
                DeleteS3ImagesUtil,
                S3Provider,
            ]
        }).compile()
        util = module.get<DeleteS3ImagesUtil>(DeleteS3ImagesUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        })
    })

    describe('deleteS3Image method test', () => {
        const data: DeleteS3ImageInterface = {
            images: [
                {
                    _id: '8234y98hb7927238239hf08df',
                    location: 'fake_AWS_image_location',
                }
            ],
            user: {
                username: 'fake_user',
                email: 'fake.email.gmail.com',
                userId: '08234h9hfh0309snf08f'
            }
        }
        it('should delete the selected image from it`s AWS S3 Bucket', async () => {
            jest
                .spyOn(util, 'deleteS3Image')
                .mockImplementation(async () => { })
            expect(await util.deleteS3Image(data)).toBeUndefined()
        })
    })

    describe('deleteS3Images method test', () => {
        const data: DeleteS3ImageInterface = {
            images: [
                {
                    _id: '8234y98hb7927238239hf08df',
                    location: 'fake_AWS_image_location',
                },
                {
                    _id: '8234y98hb792723823fqrq4afa',
                    location: 'fake_AWS_image_location',
                },
                {
                    _id: '8234y98hb7927238239fq434q3',
                    location: 'fake_AWS_image_location',
                },
            ],
            user: {
                username: 'fake_user',
                email: 'fake.email.gmail.com',
                userId: '08234h9hfh0309snf08f'
            }
        }
        const ids = [
            '8234y98hb7927238239hf08df',
            '8234y98hb792723823fqrq4afa',
            '8234y98hb7927238239fq434q3'
        ]
        it('should delete the selected images from their AWS S3 Bucket and return the delete image ids', async () => {
            jest
                .spyOn(util, 'deleteS3Images')
                .mockImplementation(async () => ids)
            expect(await util.deleteS3Images(data)).toBe(ids);
        })
    })
})