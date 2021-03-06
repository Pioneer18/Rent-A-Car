import { Test, TestingModule } from '@nestjs/testing';
import { GeoUrlApiPipe } from './geo-url-api.pipe';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { RawCreateRentalDto } from '../dto/createRental/raw-create-rental-dto';
import { LocCreateRentalDto } from '../dto/createRental/loc-create-rental.dto';
/**
 * Summary:
 * Creates a single address string from the incoming CreateRentalDto to make API Request
 * uses GeoUrlApiUtil to make api request for coordinates corresponding to the address
 * Returns the Coordinates, Address string, and the Original CreateRentalDto
 * Mocks:
 * mock the API return (which should be a provider( YUP))
 */
describe('GeoUrlApiPipe Unit Test', () => {
  let util: GeoUrlApiUtil;
  let pipe: GeoUrlApiPipe;
  let app: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoUrlApiPipe, GeoUrlApiUtil],
    }).compile();

    app = module;
    util = module.get<GeoUrlApiUtil>(GeoUrlApiUtil);
    pipe = module.get<GeoUrlApiPipe>(GeoUrlApiPipe);
  });

  describe('check Definition', () => {
    it('should have all necessary dependencies defined', () => {
      expect(pipe).toBeDefined();
      expect(util).toBeDefined();
    });
  });

  describe('test the Functionality of the Pipe', () => {
    const createRentalDto: RawCreateRentalDto = {
      rentalTitle: 'this is a fake rental title',
      rentalDescription: 'this is a fake rental description',
      specs: {
        odometer: 230000,
        transmission: 'Automatic',
        cityMpg: 28,
        hwyMpg: 33,
        mpgE: null,
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
    };
    const address: string = `${createRentalDto.location.street} ${
      createRentalDto.location.city
    } ${createRentalDto.location.zip}`;
    const mockedApiReturn:LocCreateRentalDto = {
      value: createRentalDto,
      coords: [37.786152, -79.443008],
      address: address,
    }
    it('should return the original value, an address, and coordinates', async () => {
      // mock coordinates
      // spy on the GeoUrlApiPipe
      jest
        .spyOn(pipe, 'transform')
        .mockImplementation(async () => mockedApiReturn);
      expect(await pipe.transform(createRentalDto)).toBe(mockedApiReturn);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
