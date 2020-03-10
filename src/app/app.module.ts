import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { RentalModule } from '../rental/rental.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { routes } from '../common/routes';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from '../common/filters/http-error.filter';
import { ErrorFilter } from '../common/filters/error.filters';
import { LoggingInterceptor } from '../common/interceptors/logging-interceptor';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    AppModule,
    RentalModule,
    UserModule,
    ImagesModule,
    RouterModule.forRoutes(routes),
    MongooseModule.forRoot('mongodb://localhost/rent-a-car', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: ErrorFilter },
  ],
})
export class AppModule {}
