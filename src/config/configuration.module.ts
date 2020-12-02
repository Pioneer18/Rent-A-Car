import Joi = require('@hapi/joi');
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './configuration.service';
/**
 * **summary**: Import and provide app configuration related classes
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                // GENERAL
                NODE_ENV: Joi.string()
                  .valid('development', 'production', 'test')
                  .default('development'),
                PORT: Joi.number().default(3000),
                // GEO LOCATION API
                GEO_API_KEY: Joi.string().required(),
                GEO_URL: Joi.string().required(),
                // DATABASE
                REMOTE_DB: Joi.string(),
                LOCAL_DB: Joi.string(),
                // REDIS SERVER
                REDIS_HOST: Joi.string().required(),
                REDIS_PORT: Joi.string().required(),
                CACHE_TTL: Joi.string().required(),
                // AWS API ACCESS
                ACCESS_KEY_ID: Joi.string().required(),
                SECRET_ACCESS_KEY: Joi.string().required(),
                // JWT AUTHORIZATION
                SECRET_KEY: Joi.string().required(),
                JWT_EXP_TIME: Joi.string().required(),
                AWS_S3_BUCKET_RENTALS: Joi.string().required(),
                AWS_S3_BUCKET_PROFILE: Joi.string().required(),
            }),
            validationOptions: {
                allowUnkown: false, // enforce validation, don't allow unknown keys in the env variables
                abortEarly: true, // stop validation on first error
            },
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
