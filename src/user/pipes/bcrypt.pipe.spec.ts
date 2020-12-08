import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "../dto/create-user.dto";
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

    describe('transform method test', () => {
        const data: CreateUserDto = {
            username: 'fake_user',
            email: 'fake.email@gmail.com',
            password: 'super-secret-password'
        };
        const response: CreateUserDto = {
            username: 'fake_user',
            email: 'fake.email@gmail.com',
            password: 'B9BRF-923RB2$N8FA093@0F904'
        }
        it('should use bcrypt to hash and salt the user`s password', async () => {
            jest
                .spyOn(pipe, 'transform')
                .mockImplementation(async () => response);
            expect(await pipe.transform(data)).toBe(response);
        })
    })     
})