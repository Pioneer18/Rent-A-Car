import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import cookieParser = require('cookie-parser');


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = await app.get(AppConfigService);
  app.use(cookieParser())
  app.enableCors();
  await app.listen(appConfig.port || 3000);
}
bootstrap();
