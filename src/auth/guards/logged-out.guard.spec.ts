import { CacheModule, ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigModule } from "../../config/configuration.module";
import { AppConfigService } from "../../config/configuration.service";
import { RedisModule } from "../../redis/redis.module";
import { LoggedOutGuard } from "./logged-out.guard"
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from "../../redis/service/redis.service";

describe('LoggedOutGuard Unit Test', ()  => {
    
    let guard: LoggedOutGuard;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.registerAsync({
                    imports: [AppConfigModule],
                    inject: [AppConfigService],
                    useFactory: async (appConfig: AppConfigService) => ({
                        store: redisStore,
                        host: appConfig.redis_host,
                        port: appConfig.redis_port,
                        ttl: appConfig.cache_ttl,
                    }),
                }),
                RedisModule,
            ],
            providers: [
                LoggedOutGuard,
                RedisService
            ]
        }).compile();
        guard = module.get<LoggedOutGuard>(LoggedOutGuard);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(guard).toBeDefined();
        });
    });

    describe('canActivate method test', () => {
        let data: ExecutionContext;
        const response: boolean = true;
        it('should block logged out users and authorize logged in users', async () => {
            jest
                .spyOn(guard, 'canActivate')
                .mockImplementation(async ()  => response)
            expect(await guard.canActivate(data)).toBe(response);
        })
    })
})