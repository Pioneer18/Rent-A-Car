import { Injectable } from "@nestjs/common";
import { AppConfigService } from "src/config/configuration.service";
import { S3 } from 'aws-sdk'
/**
 * **summary**: provide connection to the AWS S3 bucket
 */
@Injectable()
export class S3Provider {
    constructor(private readonly appConfig: AppConfigService) {
    }
    /**
     * **summary**: connect to the S3 bucket with the access key and it's ID
     */
    getS3 = () => {
        return new S3({
            accessKeyId: this.appConfig.access_key_id,
            secretAccessKey: this.appConfig.secret_access_key
        })
    }
}