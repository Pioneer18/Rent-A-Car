import * as mongoose from 'mongoose';
import { databaseConnection } from '../../common/Const';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * **summary**: provide a connection to the remote database
 */
export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('REMOTE_DB')), // currently returning undefined, needs a .env file
      import: [ConfigModule],
      inject: [ConfigService],
  },
];
