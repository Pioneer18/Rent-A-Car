import { CacheModule, Module } from '@nestjs/common';
import { AppConfigModule } from '../config/configuration.module';
import { AppConfigService } from '../config/configuration.service';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './service/redis.service';
/**
 * **summary**: this module is used to logout users prior to their JWT expiration time
 */
@Module({
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
    ],
    providers: [RedisService],
    exports: [RedisService, CacheModule],
})
export class RedisModule { }
