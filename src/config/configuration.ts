/**
 * MongoDB config
 * Namespaces
 */
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    geo_id: process.env.GEOD_ID,
    geo_code: process.env.GEO_CODE,
    geo_url: process.env.GEO_URL,
    remote_db: process.env.REMOTE_DB,
    local_db: process.env.LOCAL_DB,
    secret_key: process.env.SECRET_KEY,
    jwt_exp_time: process.env.JWT_EXP_TIME,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    cache_ttl: process.env.CACHE_TTL,
}))