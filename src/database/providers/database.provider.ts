import * as mongoose from 'mongoose';
import { databaseConnection } from '../../common/Const';

export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://admin:pioneer18!@ds141410.mlab.com:41410/heroku_q3rt34gr'),
  },
];
