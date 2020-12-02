import { Connection } from 'mongoose';
import { UserSchema } from '../../user/schema/user.schema';
import { databaseConnection, userModel } from '../../common/Const';
/**
 * **summary**: Provide connection to the User Model
 */
export const userProvider = [
  {
    provide: userModel, // USER_MODEL
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [databaseConnection],
  },
];
