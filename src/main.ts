import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('here is __dirname:');
  console.log(__dirname);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
