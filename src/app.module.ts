import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentalModule } from './rental/rental.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { routes } from './common/routes';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { ErrorFilter } from './common/filters/error.filters';
import { LoggingInterceptor } from './common/interceptors/logging-interceptor';
import { ImagesModule } from './images/images.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/controller/user.controller';
import { RentalController } from './rental/controller/rental.controller';
import { ImagesController } from './images/controller/images.controller';
import { AppConfigModule } from './config/configuration.module';
import { AppConfigService } from './config/configuration.service';
import { AuthController } from './auth/controller/auth.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    AppModule,
    RentalModule,
    AuthModule,
    UserModule,
    ImagesModule,
    RouterModule.forRoutes(routes),
    // parses the .env file, assign key/value pairs to process.env, stores results in configService
    // can set alternative .env file path
    AppConfigModule,
    RedisModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        uri: appConfigService.remote_db,
      }),
      inject: [AppConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client/build'),
    }),
  ],
  controllers: [AppController, UserController, RentalController, ImagesController, AuthController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: ErrorFilter },
  ],
})
export class AppModule {}
