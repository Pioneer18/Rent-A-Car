import { Routes } from 'nest-router';
import { RentalModule } from '../rental/rental.module';
import { UserModule } from '../user/user.module';
import { ImagesModule } from '../images/images.module';
import { AuthModule } from '../auth/auth.module';
import { UnavailabilityModule } from '../unavailability/unavailability.module';
/**
 * **summary**: Register the modules of the application that handle requests directly with controllers
 */
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
  {
    path: '/v1',
    module: UnavailabilityModule,
  },
];
