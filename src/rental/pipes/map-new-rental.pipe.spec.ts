import { TestingModule, Test } from '@nestjs/testing';
import { MapNewRentalPipe } from './map-new-rental.pipe';
import { LocCreateRentalDto } from '../dto/createRental/loc-create-rental.dto';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';

describe('MapNewRentalPipe Unit Test', () => {
  let pipe: MapNewRentalPipe;
  let app: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapNewRentalPipe],
    }).compile();
    app = module;
    pipe = module.get<MapNewRentalPipe>(MapNewRentalPipe);
  });

  describe('check the pipe is defined', () => {
    it('should be defined', () => {
      expect(pipe).toBeDefined();
    });
  });

  describe('test the functionality of the pipe', () => {
    it('should should return a mapped object that fits the CreateRentalDto ', async () => {
      // do stuffs
      const mockValue: LocCreateRentalDto = {
        value: {
          specs: {
            odometer: 230000,
            transmission: 'Automatic',
            cityMpg: 28,
            hwyMpg: 33,
            fuel: 'gas',
            gasGrade: 'regular',
            description: 'Tokyo grocery getter',
            make: 'Honda',
            model: 'Fit',
            style: 'sport',
            color: 'white',
            numOfSeats: 5,
            numDoors: 4,
          },
          registration: {
            vin: 'E5597C6347',
            licensePlate: 'J51Y45',
            state: 'FL',
          },
          features: ['A/C', 'AUX'],
          scheduling: {
            requiredNotice: 4,
            rentMinDuration: 4,
            rentMaxDuration: 1,
          },
          pricing: {
            price: 28,
            discounts: {
              weekly: 0,
              monthly: 0,
            },
          },
          location: {
            street: '204 W Washington St',
            city: 'Lexington',
            zip: 24450,
          },
          photos: [],
          listed: true,
        },
        coords: [37.786152, -79.443008],
        address: '204 W Washington St Lexington 24450',
      };
      const mapped = await pipe.transform(mockValue);
      const expected: CreateRentalDto = {
        rentalDescription: 'this is a tokyo grocery getter',
        address: '204 W Washington St Lexington 24450',
        specs: {
          odometer: 230000,
          transmission: 'Automatic',
          cityMpg: 28,
          hwyMpg: 33,
          fuel: 'gas',
          gasGrade: 'regular',
          description: 'Tokyo grocery getter',
          make: 'Honda',
          model: 'Fit',
          style: 'sport',
          color: 'white',
          numOfSeats: 5,
          numDoors: 4,
        },
        registration: {
          vin: 'E5597C6347',
          licensePlate: 'J51Y45',
          state: 'FL',
        },
        features: ['A/C', 'AUX'],
        scheduling: {
          requiredNotice: 4,
          rentMinDuration: 4,
          rentMaxDuration: 1,
        },
        pricing: { price: 28, discounts: { weekly: 0, monthly: 0 } },
        loc: { type: 'Point', coordinates: [37.786152, -79.443008] },
        photos: [],
        listed: true,
      };
      expect(expected).toEqual(mapped);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
