import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from 'cache-manager'
/**
 * **summary**: this Redis service is used to logout users and check if they are logged out
 */
@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) {}

    /**
     * **summary** use the key of a JWT to search the Redis 'dead-list' and check if the user is logged out
     * @param key the last 8 digits of a JWT used to list in in the dead-list of the Redis cache
     */
    async get(key) {
        return await this.cache.get(key);
    }

    /**
     * **summary**: grab more than one item for the Cache at once
     * @param keys the keys of several JWTs
     */
    async getMany(keys: string[]): Promise<string[]> {
        return await this.cache.mget(keys);
    }

    /**
     * **summary** this method is used to add a user's JWT to the logged out 'dead-list'
     * @param key the last 8 digits of a JWT
     * @param value the JWT
     */
    async set(key, value) {
        return await this.cache.set(key, value);
    }
}
