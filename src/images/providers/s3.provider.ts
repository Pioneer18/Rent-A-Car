import { Injectable } from "@nestjs/common";
import { AppConfigService } from "src/config/configuration.service";
import { S3 } from 'aws-sdk'

@Injectable()
export class S3Provider {
    constructor(private readonly appConfig: AppConfigService) {
    }

    getS3 = () => {
        return new S3({
            accessKeyId: this.appConfig.access_key_id,
            secretAccessKey: this.appConfig.secret_access_key
        })
    }
}