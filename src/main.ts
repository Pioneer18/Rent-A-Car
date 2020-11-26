import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import * as fs from 'fs';
import * as path from 'path';
import * as helmet from 'helmet';
import { Secrets } from './secrets/secrets';
import * as cookieParser from 'cookie-parser';
/**
 * **summary**: bootstrap the application. It will run as an Https server in production and 
 * it will run as an Http server in development
 */
dotenv.config();
async function bootstrap() {
  const httpsOptions = {
    key: Secrets.key,
    cert: fs.readFileSync(path.resolve(__dirname, './secrets/server.crt')), 
  };
  console.log(`The Environment: ${process.env.NODE_ENV}`);
  // Development HTTP
  if (process.env.NODE_ENV === 'development') {
    console.log("Running in Dev: Http");
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(AppConfigService);
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(appConfig.port || 3000);
  }
  // Production HTTPS
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in Prod: Https')
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
      const appConfig = await app.get(AppConfigService);
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(appConfig.port || 3000);
  }
}
bootstrap();
