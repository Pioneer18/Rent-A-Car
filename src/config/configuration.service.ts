import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * **summary**: this class provides the configservice 'getter' functionality to get variables from the environment
 * that are registered to this custom configuration module
 */
@Injectable()
export class AppConfigService {

    /**
     * **summary**: The [**ConfigService**](https://docs.nestjs.com/techniques/configuration#using-the-configservice) is used to access the environment variables
     * @param configService 
     */
    constructor(private readonly configService: ConfigService) {}

    /**
     * **summary**: retrieve the **GEO_API_KEY** environment variable
     */
    get geo_api_key(): string {
        return this.configService.get<string>('app.geo_api_key');
    }
    /**
     * **summary**: retrieve the **GEO_URL** environment variable
     */
    get geo_url(): string {
        return this.configService.get<string>('app.geo_url');
    }
    /**
     * **summary**: retrieve the **REMOTE_DB** environment variable
     */
    get remote_db(): string {
        return this.configService.get<string>('app.remote_db');
    }
    /**
     * **summary**: retrieve the **LOCAL_DB** environment variable
     */
    get local_db(): string {
        return this.configService.get<string>('app.local_db');
    }
    /**
     * **summary**: retrieve the **SECRET_KEY** environment variable
     */
    get secret_key(): string {
        return this.configService.get<string>('app.secret_key');
    }
    /**
     * **summary**: retrieve the **JWT_EXP_TIME** environment variable
     */
    get jwt_exp_time(): string {
        return this.configService.get<string>('app.jwt_exp_time');
    }
    /**
     * **summary**: retrieve the **PORT** environment variable
     */
    get port(): number { 
        return this.configService.get<number>('app.port');
    }
    /**
     * **summary**: retrieve the **REDIS_HOST** environment variable
     */
    get redis_host(): string { 
        return this.configService.get<string>('app.redis_host');
    }
    /**
     * **summary**: retrieve the **REDIS_PORT** environment variable
     */
    get redis_port(): string { 
        return this.configService.get<string>('app.redis_port');
    }
    /**
     * **summary**: retrieve the **CACHE_TTL** environment variable
     */
    get cache_ttl(): string { 
        return this.configService.get<string>('app.cache_ttl');
    }
   /**
    * **summary**: retrieve the **SECRET_ACCESS_KEY** environment variable */ 
   get secret_access_key(): string {
       return this.configService.get<string>('app.secret_access_key');
   }
   /**
    * **summary**: retrieve the **ACCESS_KEY_ID** environment variable
    */
   get access_key_id(): string {
       return this.configService.get<string>('app.access_key_id');
   }
   /**
    * **summary**: retrieve the **AWS_S3_BUCKET_RENTALS** environment variable
    */
   get aws_s3_bucket_rentals(): string {
       return this.configService.get<string>('app.aws_s3_bucket_rentals');
   }
   /**
    * **summary**: retrieve the **AWS_S3_BUKCET_PROFILE** environment variable
    */
   get aws_s3_bucket_profile(): string {
       return this.configService.get<string>('app.aws_s3_bucket_profile');
   }
}