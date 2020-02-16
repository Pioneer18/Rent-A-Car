import { CreateRentalDto } from '../dto/create-rental-dto';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { GeoInterface } from '../interface/geo.interface';

/**
 * Create a new rental with the incoming data
 */
export const mapNewRental = async (
  rental: CreateRentalDto,
  geo: GeoInterface,
) => {
  const data: MappedRentalInterface = {
    address: geo.address,
    specs: rental.specs,
    registration: rental.registration,
    features: rental.features,
    scheduling: rental.scheduling,
    pricing: rental.pricing,
    loc: {
      type: 'Point',
      coordinates: geo.coords,
    },
    photos: rental.photos,
    listed: rental.listed,
  };
  return data;
};
