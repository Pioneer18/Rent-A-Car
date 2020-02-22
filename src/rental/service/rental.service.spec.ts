import { Test, TestingModule } from '@nestjs/testing';
import { RentalService } from './rental.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { TestRentalService } from './test-rental.service';

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

    service = module.get<RentalService>(RentalService);
    testService = module.get<TestRentalService>(TestRentalService);
  });

  describe('rental service check', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('verify the RentalService.createRental method returns the expected document', () => {

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

  it('should query the db for rentals with the given query object and return the results', () => {
    // do stuffs
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
});
