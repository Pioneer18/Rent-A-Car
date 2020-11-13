import { CACHE_MANAGER, Get, Inject, Injectable } from "@nestjs/common";
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) {}

    async get(key) {
        return await this.cache.get(key);
    }

    async getMany(keys: string[]): Promise<string[]> {
        return await this.cache.mget(keys);
    }

    async set(key, value) {
        return await this.cache.set(key, value);
    }
}
