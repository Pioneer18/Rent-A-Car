import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * **summary**: this class provides the configservice 'getter' functionality to get variables from the environment
 * that are registered to this custom configuration module
 */
@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    get geo_api_key(): string {
        return this.configService.get<string>('app.geo_api_key');
    }
    get geo_url(): string {
        return this.configService.get<string>('app.geo_url');
    }
    get remote_db(): string {
        return this.configService.get<string>('app.remote_db');
    }
    get local_db(): string {
        return this.configService.get<string>('app.local_db');
    }
    get secret_key(): string {
        return this.configService.get<string>('app.secret_key');
    }
    get jwt_exp_time(): string {
        return this.configService.get<string>('app.jwt_exp_time');
    }
    get port(): number { 
        return this.configService.get<number>('app.port');
    }
    get redis_host(): string { 
        return this.configService.get<string>('app.redis_host');
    }
    get redis_port(): string { 
        return this.configService.get<string>('app.redis_port');
    }
    get cache_ttl(): string { 
        return this.configService.get<string>('app.cache_ttl');
    }
   get secret_access_key(): string {
       return this.configService.get<string>('app.secret_access_key');
   }
   get access_key_id(): string {
       return this.configService.get<string>('app.access_key_id');
   }
   get aws_s3_bucket_rentals(): string {
       return this.configService.get<string>('app.aws_s3_bucket_rentals');
   }
   get aws_s3_bucket_profile(): string {
       return this.configService.get<string>('app.aws_s3_bucket_profile');
   }
}