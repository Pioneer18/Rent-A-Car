import * as mongoose from 'mongoose';
import { databaseConnection } from 'src/common/Const';

export const databaseProvider = [
  {
    provide: databaseConnection,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/rent-a-car'),
  },
];
