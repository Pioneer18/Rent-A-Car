import { Connection } from 'mongoose';
import { UserSchema } from '../../user/schema/user.schema';
import { databaseConnection, userModel } from '../../common/Const';

export const userProvider = [
  {
    provide: userModel,// USER_MODEL
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [databaseConnection],
  },
];
