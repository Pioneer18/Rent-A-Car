import { Routes } from 'nest-router';
import { RentalModule } from '../rental/rental.module';
import { UserModule } from '../user/user.module';

export const routes: Routes = [
  {
    path: '/v1',
    module: RentalModule,
  },
  {
    path: '/v1',
    module: UserModule,
  },
];
