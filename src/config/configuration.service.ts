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
}