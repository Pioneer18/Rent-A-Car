import { Test, TestingModule } from "@nestjs/testing";
import { BcryptHashPipe } from "./bcrypt.pipe"

describe('BcryptHashPipe Unit Test', () => {
    let pipe: BcryptHashPipe;
     beforeEach(async () => {
         const module: TestingModule = await Test.createTestingModule({
             providers: [BcryptHashPipe]
         }).compile()
         pipe = module.get<BcryptHashPipe>(BcryptHashPipe);
     })

     describe('definition test', () => {
         it('should be defined', async () => {
             expect(pipe).toBeDefined();
         });
     });
})