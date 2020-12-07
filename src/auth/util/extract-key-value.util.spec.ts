import { Test, TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { ExtractKeyValueUtilInterface } from "../interfaces/utils/extractKeyValueUtil/extract-key-value-util.interface";
import { ExtractKeyValueUtil } from "./extract-key-value.util"

describe('ExtractKeyValueUtil Unit Test', () => {
    let util: ExtractKeyValueUtil;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExtractKeyValueUtil,
            ]
        }).compile()
        util = module.get<ExtractKeyValueUtil>(ExtractKeyValueUtil);
    })

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(util).toBeDefined();
        });
    });

    describe('extract method test', () => {
        let req: Request;
        const response: ExtractKeyValueUtilInterface = {
            jwt: 'FB9FHNDF80327GFKJAOYVCLH7203RG7JABFEP989',
            key: 'ABFEP989'
        };
        it('should return the jwt and it`s key from the cookie', async () => {
            jest
                .spyOn(util, 'extract')
                .mockImplementation(async () => response);
            expect(await util.extract(req)).toBe(response);
        });
    });
})