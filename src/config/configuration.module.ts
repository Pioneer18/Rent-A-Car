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
                GEO_ID: join.toString(),
                GEO_CODE: join.toString(),
                GEO_URL: join.toString(),
                REMOTE_DB: join.toString(),
                LOCAL_DB: join.toString(),
                SECRET_KEY: join.toString(),
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