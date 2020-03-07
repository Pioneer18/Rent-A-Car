import { Connection } from 'mongoose';
import { UnavailabilitySchema } from '../../rental/schema/unavailability-schema';
import { databaseConnection, unavailabilityModel } from 'src/common/Const';

export const unavailabilityProvider = [
  {
    provide: unavailabilityModel,
    useFactory: (connection: Connection) => connection.model('Unavailability', UnavailabilitySchema),
    inject: [databaseConnection],
  },
];
