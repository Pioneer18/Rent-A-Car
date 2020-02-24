import { Test, TestingModule } from '@nestjs/testing';
import { RentalService } from './rental.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { TestRentalService } from './test-rental.service';
import { SearchRentalDto } from '../dto/search-rental.dto';

/**
 * Test the properties of the RentalService Class:
 * 1) createRental
 * 2) searchRental
 * 3) editPricing
 * 4) editDetails
 * 5) scheduleUnavailability
 */

describe('RentalService Unit Tests', () => {
  let service: RentalService;
  let testService: TestRentalService;
  let app: TestingModule;

  // setup TestingModule and dependencies for this Unit Test
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
        MongooseModule.forRoot('mongodb://localhost/test-db', {
          useNewUrlParser: true,
        }),
      ],
      providers: [RentalService, TestRentalService],
    }).compile();
    app = module;
    service = module.get<RentalService>(RentalService);
    testService = module.get<TestRentalService>(TestRentalService);
  });

  describe('RentalService definition test', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('createRental method test', () => {
    it('should return a Rental document, or throw an error', async () => {
      const mockRentalModel = await testService.returnRentalModel();
      // a mocked MappedRentalInterface object to pass to the createRental method
      const mockedRental: MappedRentalInterface = {
        rentalDescription: 'This is a Tokyo grocery getter',
        address: '3489 FakeDale Drive, Fake City, GA',
        specs: {
          odometer: 120000,
          transmission: 'Automatic',
          cityMpg: 28,
          hwyMpg: 33,
          fuel: 'gas',
          gasGrade: 'regular',
          description: 'A Tokyo grocery getter',
          model: 'Honda Fit',
          style: 'Sport',
          color: 'white',
          numOfSeats: 5,
          numDoors: 4,
          driveAssist: false,
          rearviewCam: false,
          bluetooth: false,
          sunRoof: false,
        },
        registration: {
          vin: '1783938',
          licensePlate: 'G56J89',
          state: 'GA',
        },
        features: ['A/C', 'AUX', 'Bike Rack'],
        scheduling: {
          requiredNotice: 4,
          rentMinDuration: 1,
          rentMaxDuration: 6,
        },
        pricing: {
          price: 28,
          discounts: {
            weekly: 0,
            monthly: 0,
          },
        },
        loc: {
          type: 'Point',
          coordinates: [35.5, -82.5],
        },
        photos: [],
        listed: true,
      };

      // mocked createRental method; does not actually save document to DB
      const mockCreateRental = async rental => {
        try {
          const document = await new mockRentalModel(rental);
          return document;
        } catch (err) {
          throw new Error(err);
        }
      };

      // assert the returned document property types match a Rental
      const result = await mockCreateRental(mockedRental);
      expect(result).toEqual(expect.any(Object));
      expect(result.specs).toEqual(
        expect.objectContaining({
          driveAssist: expect.any(Boolean),
          rearviewCam: expect.any(Boolean),
          bluetooth: expect.any(Boolean),
          sunRoof: expect.any(Boolean),
          odometer: expect.any(Number),
          transmission: expect.any(String),
          cityMpg: expect.any(Number),
          hwyMpg: expect.any(Number),
          fuel: expect.any(String),
          gasGrade: expect.any(String),
          description: expect.any(String),
          model: expect.any(String),
          style: expect.any(String),
          color: expect.any(String),
          numOfSeats: expect.any(Number),
          numDoors: expect.any(Number),
        }),
      );
      expect(result.pricing).toEqual(
        expect.objectContaining({
          discounts: expect.any(Object),
          price: expect.any(Number),
        }),
      );
      expect(result.pricing.discounts).toEqual(
        expect.objectContaining({
          weekly: expect.any(Number),
          monthly: expect.any(Number),
        }),
      );
      expect(result.features).toEqual(expect.any(Array));
      expect(result.photos).toEqual(expect.any(Array));
      expect(typeof result._id).toEqual('object');
      expect(result.rentalDescription).toEqual(expect.any(String));
      expect(result.address).toEqual(expect.any(String));
      expect(result.registration).toEqual(
        expect.objectContaining({
          vin: expect.any(String),
          licensePlate: expect.any(String),
          state: expect.any(String),
        }),
      );
      expect(result.scheduling).toEqual(
        expect.objectContaining({
          requiredNotice: expect.any(Number),
          rentMinDuration: expect.any(Number),
          rentMaxDuration: expect.any(Number),
        }),
      );
      expect(result.loc).toEqual(
        expect.objectContaining({
          type: expect.any(String),
          coordinates: expect.any(Array),
        }),
      );
      expect(result.listed).toEqual(expect.any(Boolean));
    });
  });

  describe('searchRental method & createRentalQuery test', () => {
    it('should return the expected query from the given SearchRentalDto', async () => {
      const mockSearchRental = async rental => {
        try {
          const query = await testService.createRentalQuery(rental);
          return query;
        } catch (err) {
          throw new Error(err);
        }
      };
      const mockSearchRentalDto: SearchRentalDto = {
        address: '204 W Washington St Lexington 24450',
        price: 28,
        features: ['A/C', 'AUX'],
        rentalDuration: 3,
        givenNotice: 2,
        loc: {
          type: 'Point',
          coordinates: [39, -50],
        },
      };
      const test = await mockSearchRental(mockSearchRentalDto);
      expect(test['scheduling.rentMinDuration']).toEqual(
        expect.objectContaining({ $lte: 3 }),
      );
      expect(await test['scheduling.rentMaxDuration']).toEqual(
        expect.objectContaining({ $gte: 3 }),
      );
      expect(await test['scheduling.requiredNotice']).toEqual(
        expect.objectContaining({ $lte: 2 }),
      );
      expect(await test.loc.$near.$maxDistance).toBe(12875);
      expect(await test.loc.$near.$geometry.type).toBe('Point');
      expect(await test.loc.$near.$geometry.coordinates[0]).toBe(39);
      expect(await test.loc.$near.$geometry.coordinates[1]).toBe(-50);
      expect(await test.pricing.price).toBe(28);
      expect(await test.features.$in[0]).toBe('A/C');
      expect(await test.features.$in[1]).toBe('AUX');
    });
  });

  it('should query the db to update a rental with the given update and throw an error if one is caught', () => {
    // do stuffs
  });

  it(`should query the db to update a rental's pricing with the given update, and throw an error if one is caught`, () => {
    // do stuffs
  });

  // scheduledUnavailability if pipes remove logic from handler
  it(`should (receive a pre-validated unavailability) save the given unavailability or throw an error`, () => {
    // do stuffs
  });

  // scheduledUnavailability if utilities used in the handler
  it('should query for existing unavailability, check for overlap if there is unavailability already, and save if there are no conflicts', () => {
    // do stuffs
  });

  afterAll(async () => {
    await app.close();
  });
});
