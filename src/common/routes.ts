import { Routes } from 'nest-router';
import { VehicleModule } from '../vehicle/vehicle.module';
import { UserModule } from '../user/user.module';

export const routes: Routes = [
    {
        path: '/v1',
        module: VehicleModule,
    },
    {
        path: '/v1',
        module: UserModule,
    },
];