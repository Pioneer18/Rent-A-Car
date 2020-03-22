import * as mongoose from 'mongoose';
import { databaseConnection } from 'src/common/Const';
import { ConfigService } from '@nestjs/config';

export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      // mongoose.connect('mongodb://localhost/rent-a-car'),
      // 'mongodb://jon:Pioneer18!@ds263107.mlab.com:63107/heroku_xn7cvdx1'
      mongoose.connect(configService.get('REMOTE_DB')),
  },
];
