/*import { Connection } from 'mongoose';
import { UnavailabilitySchema } from '../../rental/schema/unavailability-schema';
import { databaseConnection, unavailabilityModel } from '../../common/Const';

 * **summary**: Provide a connection to the Unavailability Model
 
export const unavailabilityProvider = [
  {
    provide: unavailabilityModel, // UNAVAILABILITY_MODEL
    useFactory: (connection: Connection) => connection.model('Unavailability', UnavailabilitySchema),
    inject: [databaseConnection],
  },
];*/
