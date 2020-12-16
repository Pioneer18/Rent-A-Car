import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppConfigService } from './config/configuration.service';
import * as helmet from 'helmet';
import { Secrets } from './secrets/secrets';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * **summary**: Bootstrap the application. It will run as an Https server in production and
 * it will run as an Http server in development
 */
dotenv.config();
async function bootstrap() {

  const httpsOptions = {
    key: Secrets.key,
    cert: Secrets.crt, //fs.readFileSync(path.resolve(__dirname, './secrets/server.crt')),
  };

  console.log(`The Environment: ${process.env.NODE_ENV}`);
  // Development HTTP
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in Dev: Http');
    const app = await NestFactory.create(AppModule);
    const appConfig = await app.get(AppConfigService);
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    // OpenApi specification document builder
    const options = new DocumentBuilder()
      .setTitle('Rent-A-Car-API')
      .setDescription('Rent-A-Car is an example TypeScript backend application to demonstrate technical skill; created by Jonathan Sells')
      .setVersion('1.0')
      .addTag('rac')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    await app.listen(appConfig.port || 3000);
  }
  // Production HTTPS
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in Prod: Https');
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
