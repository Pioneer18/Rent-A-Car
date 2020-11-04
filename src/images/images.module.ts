import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesController } from './controller/images.controller';
import { ImageSchema } from './schema/images.schema';
import { ImagesService } from './service/images.service';

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema}])
    ],
    controllers: [ImagesController],
    providers: [ImagesService],
    exports: [ImagesService]

})
export class ImagesModule {}
