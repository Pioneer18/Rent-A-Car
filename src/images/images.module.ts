import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/configuration.module';
import { AppConfigService } from '../config/configuration.service';
import { DatabaseModule } from '../database/database.module';
import { ImagesController } from './controller/images.controller';
import { ImageSchema } from './schema/images.schema';
import { ImagesService } from './service/images.service';
import { ProcessSaveDataUtil } from './util/process-save-data.util';


@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Images', schema: ImageSchema}]),
        AppConfigModule,
    ],
    controllers: [ImagesController],
    providers: [ImagesService, AppConfigService, ProcessSaveDataUtil], 
    exports: [ImagesService]

})
export class ImagesModule {
    constructor() {
        ImageSchema.index({rental_id: 1}); 
        ImageSchema.index({user_id: 1}); 
    }
}
