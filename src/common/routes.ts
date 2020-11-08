import { Routes } from 'nest-router';
import { RentalModule } from '../rental/rental.module';
import { UserModule } from '../user/user.module';
import { ImagesModule } from '../images/images.module';
import { AuthModule } from 'src/auth/auth.module';

export const routes: Routes = [
  {
    path: '/v1',
    module: RentalModule,
  },
  {
    path: '/v1',
    module: UserModule,
  },
  {
    path: '/v1',
    module: ImagesModule,
  },
  {
    path: '/v1',
    module: AuthModule,
  },
];
