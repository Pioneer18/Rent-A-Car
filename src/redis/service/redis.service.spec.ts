import { CACHE_MANAGER } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { RedisService } from "./redis.service"

describe('RedisService Unit Test', () => {
    let service: RedisService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RedisService,
                {
                    provide: CACHE_MANAGER,
                    useValue: CACHE_MANAGER
                }
            ]
        }).compile()
        service = module.get<RedisService>(RedisService);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(service).toBeDefined();
        });
    });

    describe('get method test', () => {
        const data: string = 'G8HL.82DR'
        const response: string = 'LKJBAF73.BFU8AFOBAFBAFB80390_73B.LG' // returned JWT
        it('should get a item from the redis cache', async () => {
            jest
                .spyOn(service, 'get')
                .mockImplementation(async () => response);
            expect(await service.get(data)).toBe(response);
        });
    });

    describe('set method test', () => {
        const key: string = 'GEHL.82DR';
        const value: string = 'LKJBAF73.BFU8AFOBAFBAFB80390_73B.LG';
        const response: string = "set"
        it('should set the jwt with the key in the redis cache', async () => {
            jest
                .spyOn(service, 'set')
                .mockImplementation(async () => response);
            expect(await service.set(key, value)).toBe(response);
        })
    })
})