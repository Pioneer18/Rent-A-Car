import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = await app.get(AppConfigService);
  app.enableCors();
  await app.listen(appConfig.port || 3000);
}
bootstrap();
