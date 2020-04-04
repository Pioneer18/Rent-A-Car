import * as mongoose from 'mongoose';
import { databaseConnection } from '../../common/Const';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('REMOTE_DB')),
      import: [ConfigModule],
      inject: [ConfigService],
  },
];
