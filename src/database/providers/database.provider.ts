import * as mongoose from 'mongoose';
import { databaseConnection } from '../../common/Const';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://Pioneer20:unathi2020@cluster0.2d6ys.mongodb.net/Rent-A-Car?retryWrites=true&w=majority'), // currently returning undefined, needs a .env file
      import: [ConfigModule],
      inject: [ConfigService],
  },
];
