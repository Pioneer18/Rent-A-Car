import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import cookieParser = require('cookie-parser');
import * as fs from 'fs';


dotenv.config();
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const appConfig = await app.get(AppConfigService);
  app.use(cookieParser())
  app.enableCors();
  await app.listen(appConfig.port || 3000);
}
bootstrap();
