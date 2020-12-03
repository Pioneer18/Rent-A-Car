/**
 * **summary**: This method registers the values in the environement to the App Configuration module
 */
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    geo_api_key: process.env.GEO_API_KEY,
    geo_url: process.env.GEO_URL,
    remote_db: process.env.REMOTE_DB,
    test_db: process.env.TEST_DB,
    local_db: process.env.LOCAL_DB,
    secret_key: process.env.SECRET_KEY,
    jwt_exp_time: process.env.JWT_EXP_TIME,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    cache_ttl: process.env.CACHE_TTL,
    access_key_id: process.env.ACCESS_KEY_ID,
    secret_access_key: process.env.SECRET_ACCESS_KEY,
    aws_s3_bucket_rentals: process.env.AWS_S3_BUCKET_RENTALS,
    aws_s3_bucket_profile: process.env.AWS_S3_BUCKET_PROFILE,
}));
