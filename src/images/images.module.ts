import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/configuration.module';
import { AppConfigService } from '../config/configuration.service';
import { DatabaseModule } from '../database/database.module';
import { ImagesController } from './controller/images.controller';
import { ImageSchema } from './schema/images.schema';
import { ImagesService } from './service/images.service';
import { ProcessUploadDataUtil } from './util/process-upload-data.util';

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema}]),
        AppConfigModule,
    ],
    controllers: [ImagesController],
    providers: [ImagesService, AppConfigService, ProcessUploadDataUtil], 
    exports: [ImagesService]

})
export class ImagesModule {
    constructor() {
        ImageSchema.index({tag: 1}); // tag given when image(s) uploaded to AWS
    }
}
