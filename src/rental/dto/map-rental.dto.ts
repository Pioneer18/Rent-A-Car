import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './create-rental-dto';

@Injectable()
export class MapRentalDto {
  value: CreateRentalDto;
  coords: [number, number];
  address: string;
}
