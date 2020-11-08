import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * This class provides the configservice 'getter' functionality
 */
@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    get geo_id(): string {
        return this.configService.get<string>('app.geo_id')
    }
    get geo_code(): string {
        return this.configService.get<string>('app.geo_code')
    }
    get geo_url(): string {
        return this.configService.get<string>('app.geo_url')
    }
    get remote_db(): string {
        return this.configService.get<string>('app.remote_db')
    }
    get local_db(): string {
        return this.configService.get<string>('app.local_db')
    }
    get secret_key(): string {
        return this.configService.get<string>('app.secret_key')
    }
    get port(): number { 
        return this.configService.get<number>('app.port');
    }
    get jwt_exp_time(): number {
        return this.configService.get<number>('app.jwt_exp_time');
    }
    /**
     * get env(): string { 
     *  return this.configService.get<string>('app.env');
     * }
     * 
    */
}