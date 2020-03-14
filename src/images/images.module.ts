import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ImagesController } from './controller/images.controller';
import { ImagesService } from './service/images.service';
import { ImagesMiddleware } from './images.middleware';

@Module({
    controllers: [ImagesController],
    providers: [ImagesService],

})
export class ImagesModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ImagesMiddleware)
            .forRoutes('v1/images');
    }
}
