import { Test, TestingModule } from '@nestjs/testing';
import { RentalService } from './rental.service'
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';
import { TestRentalService } from './test-rental.service';
import { SearchRentalDto } from '../dto/searchRental/search-rental.dto';
import { UnavailabilitySchema } from '../schema/unavailability-schema';
import { unavailabilityModel } from '../../common/Const';
import { EditDetailsInterface } from '../interface/service/edit-details.interface';
import { EditPricingInterface } from '../interface/service/edit-pricing.interface';
import { EditDetailsUpdater } from '../interface/service/edit-details-updater.interface';
import { ScheduleUnavailabilityInterface } from '../interface/service/schedule-unavailability.interface';
import { UpdateUnavailabilityDataInterface } from '../interface/service/update-unavailability-data.interface';
import { RemoveUnavailabilityInterface } from '../interface/service/remove-unavailability.interface';
import { SearchRentalInterface } from '../interface/service/search-rental.interface';
import { RentalQuery } from '../interface/service/create-rental-query.interface';
import { Logger } from '@nestjs/common';
import { MapRentalUtil } from '../utils/map-rental.util';

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
        MongooseModule.forFeature([{ name: unavailabilityModel, schema: UnavailabilitySchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
      ],
      providers: [RentalService, TestRentalService, MapRentalUtil],
    }).compile();
    app = module;
    service = module.get<RentalService>(RentalService);
    testService = module.get<TestRentalService>(TestRentalService);
  });

  describe('RentalService definition test', () => {
    it('should be defined', async () => {
      expect(service).toBeDefined()
    });
  });

  describe('createRental method test', () => {
    it('should return a Rental document, or throw an error', async () => {
      const mockRentalModel = await testService.returnRentalModel();
      // a mocked CreateRentalDto object to pass to the createRental method
      const mockedRental: CreateRentalDto = {
        rentalTitle: 'this is a fake rental title',
        rentalDescription: 'This is a Tokyo grocery getter',
        address: '3489 FakeDale Drive, Fake City, GA',
        specs: {
          odometer: 120000,
          transmission: 'Automatic',
          cityMpg: 28,
          hwyMpg: 33,
          mpgE: null,
          fuel: 'gas',
          gasGrade: 'regular',
          description: 'A Tokyo grocery getter',
          make: 'Honda',
          model: 'Fit',
          style: 'Sport',
          color: 'white',
          numOfSeats: 5,
          numDoors: 4,
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

  describe('editPricing method test', () => {
    it('should query the db to update a rental`s pricing with the given update and throw an error if one is caught', async () => {
      const pricingDto = {
        rentalId: 'fake-id',
        price: 29,
        discounts: {
          weekly: 5,
          monthly: 10,
        },
      };
      const mockEditPricing = async (data: EditPricingInterface) => {
        const filter = { _id: data.rentalId };
        const update = {
          specs: {
            pricing: {
              price: data.price,
              discounts: {
                weekly: data.discounts.weekly,
                monthly: data.discounts.monthly,
              },
            },
          },
        };
        const updater = {
          $set: update,
        };
        return { updater, filter };
      };
      // expect filter
      const test = await mockEditPricing(pricingDto);
      expect(test.filter).toEqual(expect.objectContaining({ _id: 'fake-id' }));
      expect(test.updater.$set.specs.pricing.price).toBe(29);
      expect(test.updater.$set.specs.pricing.discounts.weekly).toBe(5);
      expect(test.updater.$set.specs.pricing.discounts.monthly).toBe(10);
    });
  });

  describe('editDetails method test', () => {
    it(`should query the db to update a rental's spec property with the given update, and throw an error if one is caught`, async () => {
      // create update
      const data: EditDetailsInterface = {
        rentalId: '5fc575be2de5f937487a0994',
        specs: {
          odometer: 10000,
          transmission: 'Auto',
          cityMpg: 33,
          hwyMpg: 40,
          fuel: 'gas',
          gasGrade: 'regular',
          description: 'Super fast awesome car',
          make: "Honda",
          model: "Fit",
          style: "Hatchback",
          color: "white",
          numOfSeats: 5,
          numDoors: 4
        },
        features: ["A/C", "Bike Rack", "Radio"]
      };
      // create a mock updateDetails method
      const mockEditDetails = async (data) => {
        try {
          const filter = { _id: data.rentalId };
          const update: EditDetailsUpdater = {
            specs: data.specs,
            features: data.features,
          };
          return { update, filter }
        } catch (err) {
          throw new Error(err);
        }
      };
      // test the mock method with the mock data
      const test = await mockEditDetails(data);
      expect(test.filter).toEqual(expect.objectContaining({ _id: data.rentalId }));
      expect(test.update).toEqual(expect.objectContaining({
        $set: {
          specs: data.specs,
          features: data.features
        }
      }));
    });
  })

  // scheduledUnavailability
  describe(`scheduleUnavailability method test`, () => {
    it(`should query for existing unavailability, check for overlap if there is unavailability already, and save if there are no conflicts`, async () => {
      // mock data
      const processed: ScheduleUnavailabilityInterface = {
        "y1Query": {
          "rentalId": "5fbdd52de2357234041850a2",
          "year": 2020,
          "doy": {
            "$lte": 360,
            "$gte": 358
          },
          "$or": [
            {
              "start": {
                "$gte": 0
              },
              "end": {
                "$lte": 24
              }
            },
            {
              "start": {
                "$lte": 0
              },
              "end": {
                "$gte": 0
              }
            },
            {
              "start": {
                "$lte": 24
              },
              "end": {
                "$gte": 24
              }
            },
            {
              "start": {
                "$lte": 0
              },
              "end": {
                "$gte": 24
              }
            }
          ]
        },
        "y2Query": null,
        "data": {
          "y1": [
            {
              "unavailabilityId": "1606965381434",
              "rentalId": "5fbdd52de2357234041850a2",
              "year": 2020,
              "doy": 358,
              "start": 0,
              "end": 24,
              "title": "Christmas Break"
            },
            {
              "unavailabilityId": "1606965381434",
              "rentalId": "5fbdd52de2357234041850a2",
              "year": 2020,
              "doy": 359,
              "start": 0,
              "end": 24,
              "title": "Christmas Break"
            },
            {
              "unavailabilityId": "1606965381434",
              "rentalId": "5fbdd52de2357234041850a2",
              "year": 2020,
              "doy": 360,
              "start": 0,
              "end": 24,
              "title": "Christmas Break"
            }
          ],
          "y2": null
        }
      }
      // mock methods
      const mockCheckForOverlap = async (data: ScheduleUnavailabilityInterface) => {
        const { y1Query, y2Query } = data;
        // if there are 2 years
        if (y2Query !== null) {
          const test1 = [];
          const test2 = [];
          if (test1.length || test2.length) {
            throw new Error('this request overlaps with existing unavailability');
          }
        }
        // else
        const test = [];
        if (test.length) {
          throw new Error('this request overlaps with existing unavailability');
        }
      }
      const mockScheduleUnavailability = async (processed: ScheduleUnavailabilityInterface) => {
        try {
          // if it passed, combine data into one array and insert
          await mockCheckForOverlap(processed);
          const { y1, y2 } = processed.data;
          if (y2 !== null) {
            const merged = y1.concat(y2);
            // data that would be inserted into db
            return merged;
          }
          // data that would be inseerted into db
          return y1;
        } catch (err) {
          throw new Error(err);
        }
      }
      // test
      const test = await mockScheduleUnavailability(processed);
      expect(test).toEqual(expect.arrayContaining([
        {
          "unavailabilityId": "1606965381434",
          "rentalId": "5fbdd52de2357234041850a2",
          "year": 2020,
          "doy": 358,
          "start": 0,
          "end": 24,
          "title": "Christmas Break"
        },
        {
          "unavailabilityId": "1606965381434",
          "rentalId": "5fbdd52de2357234041850a2",
          "year": 2020,
          "doy": 359,
          "start": 0,
          "end": 24,
          "title": "Christmas Break"
        },
        {
          "unavailabilityId": "1606965381434",
          "rentalId": "5fbdd52de2357234041850a2",
          "year": 2020,
          "doy": 360,
          "start": 0,
          "end": 24,
          "title": "Christmas Break"
        }
      ]));
    });
  })

  // updateUnavailability
  describe(`updateUnavailability method test`, () => {
    it('should edit a block of scheduled unavailability by either extending or reducing the scheduled duration of time on the rental', async () => {
      // mock data
      const data: UpdateUnavailabilityDataInterface = {
        filter: {
          rentalId: '5fbdd52de2357234041850a2',
          unavailabilityId: '1606606517860'
        },
        updater: {
            start: 0,
            end: 12
        }
      }
      // mock method
      const updateUnavailability = async (data: UpdateUnavailabilityDataInterface) => {
        try {
          const update = { filter: data.filter, updater: data.updater }
          return update;
        } catch (err) {
          throw new Error(err);
        }
      }
      // test
      const test = await updateUnavailability(data);
      expect(test.filter).toEqual(expect.objectContaining({
        rentalId: '5fbdd52de2357234041850a2',
        unavailabilityId: '1606606517860'
      }));
      expect(test.updater).toEqual(expect.objectContaining({
        $set: {
          start: 0,
          end: 12
        }
      }))
    });
  })

  // removeUnavailability
  describe(`removeUnavailability method test`, () => {
    it('should remove an amount of time from a scheduled duration of unavailability on the rental', async () => {
      // mock data
      const deletedCount = [0,1,2];
      const data: RemoveUnavailabilityInterface = {
        rentalId: '5fbdd52de2357234041850a2',
        unavailabilityId: '1606606517860'
      }
      // mock method
      const removeUnavailability = async (data) => {
        try {
          const remove = {
            rentalId: data.rentalId,
            unavailabilityId: data.unavailabilityId,
          };
          if (deletedCount.length === 0) {
            throw new Error('No Unavailability documents were found, no documents were deleted');
          }
          return remove;
        } catch (err) {
          throw new Error(err);
        }
      }
      // test
      const test = await removeUnavailability(data);
      expect(test.rentalId).toEqual(expect.stringMatching('5fbdd52de2357234041850a2'));
      expect(test.unavailabilityId).toEqual(expect.stringMatching('1606606517860'));
    });
  })

  // createRentalQuery
  describe(`createRentalQuery method test`, () => {
    it('should convert a searchRentalDto into a mongoose query for the searchRental method', async () => {
      // mock data
      const data: SearchRentalInterface = {
        address: '630 15th Tower 100 Ave, Longmont, Colorado(CO), 80501',
        price: 30,
        features: [],
        rentalDuration: 2,
        loc: {
          type:'Point',
          coordinates: [ 33, -33]
        },
        givenNotice: 2
      }
      // mock method
      const createRentalQuery = async (rental: SearchRentalInterface) => {
        try {
          const query: RentalQuery = {
            'scheduling.rentMinDuration': { $lte: rental.rentalDuration },
            'scheduling.rentMaxDuration': { $gte: rental.rentalDuration },
            'scheduling.requiredNotice': { $lte: rental.givenNotice },
            'loc': {
              $near: {
                $maxDistance: 12875, // 8 miles
                $geometry: {
                  type: rental.loc.type,
                  coordinates: [
                    rental.loc.coordinates[0], // latitude
                    rental.loc.coordinates[1], // longitude
                  ],
                },
              },
            },
          };
          rental.price
            ? (query.pricing = {
              price: rental.price, // add price as optional search parameter
            })
            : (rental.price = null);
          rental.features
            ? (query.features = { $in: rental.features })
            : (rental.features = null);
          return query;
        } catch (err) {
          throw new Error(err);
        }
      }
      // test
      const test = await createRentalQuery(data);
      Logger.log('HERE IS THE: RentalQuery')
      Logger.log(test);
      expect(test).toEqual(expect.objectContaining({
        "scheduling.rentMinDuration": {
          "$lte": 2
        },
        "scheduling.rentMaxDuration": {
          "$gte": 2
        },
        "scheduling.requiredNotice": {
          "$lte": 2
        },
        "loc": {
          "$near": {
            "$maxDistance": 12875,
            "$geometry": {
              "type": "Point",
              "coordinates": [
                33,
                -33
              ]
            }
          }
        },
        "pricing": {
          "price": 30
        },
        "features": {
          "$in": []
        }
      }))
    });
  })

  afterAll(async () => {
    await app.close();
  });
}); 