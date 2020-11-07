import Joi = require("@hapi/joi");
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
                GEO_ID: Joi.string(),
                GEO_CODE: Joi.string(),
                GEO_URL: Joi.string(),
                REMOTE_DB: Joi.string(),
                LOCAL_DB: Joi.string(),
                SECRET_KEY: Joi.string(),
                NODE_ENV: Joi.string()
                  .valid('development', 'production', 'test')
                  .default('development'),
                PORT: Joi.number().default(3000),
            })
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService]
})
export class AppConfigModule {}