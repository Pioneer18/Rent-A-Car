import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import * as fs from 'fs';
import * as path from 'path';


dotenv.config();
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './secrets/private.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './secrets/public.pem')), 
  };
  console.log(`The Environment: ${process.env.NODE_ENV}`);
  // Development HTTP
  if (process.env.NODE_ENV === 'development') {
    console.log("Running in Dev: Http");
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(AppConfigService);
    app.enableCors();
    await app.listen(appConfig.port || 3000);
  }
  // Production HTTPS
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in Prod: Https')
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  }
}
bootstrap();
