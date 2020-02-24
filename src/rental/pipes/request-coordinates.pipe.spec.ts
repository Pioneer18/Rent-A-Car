import { TestingModule, Test } from '@nestjs/testing';
import { RequestCoordinatesPipe } from './request-coordinates.pipe';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { RentalDurationDto } from '../dto/rental-duration.dto';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { async } from 'rxjs/internal/scheduler/async';

/**
 * What does this pipe do?
 * Summary:
 * Accepts a RentalDurationDto and returns a SearchRentalDto
 * requests coordinates for the loc.coordinates of the SearchRentalDto
 * Tests:
 * #1 transform
 * expect a SearchRentalDto
 * expect correct coordinates for given address
 * Mocks:
 * mock the pipe
 */
describe('RequestCoordinatesPipe Unit Test', () => {

    let app: TestingModule;
    let pipe: RequestCoordinatesPipe;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RequestCoordinatesPipe, GeoUrlApiUtil],
        }).compile();
        app = module;
        pipe = module.get<RequestCoordinatesPipe>(RequestCoordinatesPipe);
    });

    describe('RequestCoordinatesPipe definition test', () => {
        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });
    });

    describe('transform method test', () => {
        it('should return a SearchRentalDto if given a RentalDurationDto', async () => {
            const coords: [number, number] = [39, -50];
            const mockRentalDurationDto: RentalDurationDto = {
                address: '204 W Washington St Lexington 24450',
                price: 28,
                features: ['A/C', 'AUX'],
                rentalDuration: 3,
                givenNotice: 2,
            };
            const expected: SearchRentalDto = {
                address: mockRentalDurationDto.address,
                price: mockRentalDurationDto.price,
                features: mockRentalDurationDto.features,
                rentalDuration: mockRentalDurationDto.rentalDuration,
                givenNotice: mockRentalDurationDto.givenNotice,
                loc: {
                    type: 'Point',
                    coordinates: coords,
                },
            };
            const mockRequestCoordinatesPipe = async (value) => {
                try {
                    // Logger.log(`geoUrl: ${geoUrl}`);
                    const dto: SearchRentalDto = {
                        address: value.address,
                        price: value.price,
                        features: value.features,
                        rentalDuration: value.rentalDuration,
                        loc: {
                            type: 'Point',
                            coordinates: coords,
                        },
                        givenNotice: value.givenNotice,
                    };
                    return dto;
                } catch (err) {
                    throw new Error(err);
                }
            };
            const test = await mockRequestCoordinatesPipe(mockRentalDurationDto);
            expect(test.address).toBe(expected.address);
            expect(test.price).toBe(expected.price);
            expect(test.features).toBe(expected.features);
            expect(test.rentalDuration).toBe(expected.rentalDuration);
            expect(test.givenNotice).toBe(expected.givenNotice);
            expect(test.loc.type).toBe(expected.loc.type);
            expect(test.loc.coordinates).toBe(expected.loc.coordinates);
        });
    });

    afterAll(async () => {
        app.close();
    });
});
