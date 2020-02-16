import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './create-rental-dto';
import { GeoInterface } from '../interface/geo.interface';

@Injectable()
export class MapRentalDto {
  value: CreateRentalDto;
  coords: [number, number];
  address: string;
}
