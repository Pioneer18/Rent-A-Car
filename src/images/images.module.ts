import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesController } from './controller/images.controller';
import { ImagesService } from './service/images.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ImagesController],
    providers: [ImagesService],
    exports: [ImagesService]

})
export class ImagesModule {}
