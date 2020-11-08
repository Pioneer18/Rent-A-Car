import Joi = require("@hapi/joi");
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import configuration from "./configuration";
import { AppConfigService } from "./configuration.service";
/**
 * Import and provide app configuration related classes
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                GEO_ID: Joi.string().required(),
                GEO_CODE: Joi.string().required(),
                GEO_URL: Joi.string().required(),
                REMOTE_DB: Joi.string(),
                LOCAL_DB: Joi.string(),
                SECRET_KEY: Joi.string(),
                NODE_ENV: Joi.string()
                  .valid('development', 'production', 'test')
                  .default('development'),
                PORT: Joi.number().default(3000),
                JWT_SECRET: Joi.string(), // required
                JWT_EXPIRATION_TIME: Joi.string(),// required
            }),
            validationOptions: {
                allowUnkown: false, // enforce validation, don't allow unknown keys in the env variables
                abortEarly: true, // stop validation on first error
            }
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {}