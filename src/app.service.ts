import { Injectable } from '@nestjs/common';
/**
 * **summary**: Does not provide any real functionality for the app
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
