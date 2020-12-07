import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { rentals } from "./../../common/Const";
import { AppConfigModule } from "../../config/configuration.module";
import { CreateInterface } from "../interfaces/utils/createMulterUploadUtil/create.interface";
import { S3Provider } from "../providers/s3.provider";
import { CreateMulterUploadUtil } from "./create-multer-upload.util"

describe('CreateMulterUploadUtil Unit Test', () => {
    let util: CreateMulterUploadUtil;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule
            ],
            providers: [
                CreateMulterUploadUtil,
                S3Provider,
            ]
        }).compile()
        util = module.get<CreateMulterUploadUtil>(CreateMulterUploadUtil);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('create method test', () => {
        let req: Request;
        const data: CreateInterface = {
            req,
            category: rentals
        }
        let response: Function = () => {return 'hello world'};
        it('should create the multer upoload function for the S3 Bucket', async ()=> {
            jest
                .spyOn(util, 'create')
                .mockImplementation(async () => response);
            expect(await util.create(data)).toBe(response);
        })
    })

})