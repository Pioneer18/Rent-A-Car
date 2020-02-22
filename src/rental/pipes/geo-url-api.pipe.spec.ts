import { Test, TestingModule } from '@nestjs/testing';
import { GeoUrlApiPipe } from './geo-url-api.pipe';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { CreateRentalDto } from '../dto/create-rental-dto';
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

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GeoUrlApiPipe, GeoUrlApiUtil],
        }).compile();

        util = module.get<GeoUrlApiUtil>(GeoUrlApiUtil);
        pipe = module.get<GeoUrlApiPipe>(GeoUrlApiPipe);
    });

    describe('Check Definition', () => {
        it('should have all necessary dependencies defined', () => {
            expect(pipe).toBeDefined();
            expect(util).toBeDefined();
        });
    });

    describe('Test the Functionality of the Pipe', () => {
        it('should return the original value, an address, and coordinates', async () => {
            // mock coordinates
            const mockedApiReturn: [number, number] = [37.786152, -79.443008];
            // spy on the GeoUrlApiPipe
            jest.spyOn(pipe, 'getCoordinates').mockImplementation(async () => mockedApiReturn);
            // raw value
            const createRentalDto: CreateRentalDto = {
                specs: {
                    odometer: 230000,
                    transmission: 'Automatic',
                    cityMpg: 28,
                    hwyMpg: 33,
                    fuel: 'gas',
                    gasGrade: 'regular',
                    description: 'Tokyo grocery getter',
                    model: 'Honda Fit',
                    style: 'sport',
                    color: 'white',
                    numOfSeats: 5,
                    numDoors: 4,
                    driveAssist: false,
                    rearviewCam: false,
                    bluetooth: false,
                    sunRoof: false,
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
            const address: string = `${createRentalDto.location.street} ${createRentalDto.location.city} ${createRentalDto.location.zip}`;
            const test = await pipe.transform(createRentalDto);
            expect(test.value).toEqual(createRentalDto);
            expect(test.address).toEqual(address);
            expect(test.coords).toEqual(mockedApiReturn);
        });
    });

});
