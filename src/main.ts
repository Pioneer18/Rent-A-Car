import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
/**
 * **summary**: Bootstrap the application. It will run as an Https server in production and
 * it will run as an Http server in development
 */
dotenv.config();
async function bootstrap() {
  // Development HTTP
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in Dev: http://localhost:3000');
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(AppConfigService);
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(appConfig.port || 3000);
  }
  // Production HTTPS Google Cloud Run
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in Prod: https://racapp-ckibfdodrq-ue.a.run.app');
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(AppConfigService);
    console.log(appConfig.remote_db);
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(appConfig.port || 3000);
  }
}
bootstrap();
