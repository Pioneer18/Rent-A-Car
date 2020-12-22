import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from '../service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { CreateRentalDto } from '../dto/createRental/create-rental.dto';
import { SearchRentalDto } from '../dto/searchRental/search-rental.dto';
import { PricingDto } from '../dto/pricing/pricing.dto';
import { RentalInterface } from '../interface/rental.interface';
import { JwtPayloadInterface } from '../../auth/interfaces/jwt-payload.interface';
import { unavailabilityModel } from '../../common/Const';
import { UnavailabilitySchema } from '../schema/unavailability-schema';
import { EditDetailsDto } from '../dto/details/edit-details.dto';
import { ProcessedUnavailabilityDto } from '../dto/unavailability/schedule/processed-unavailability.dto';
import { UnavailabilityInterface } from '../interface/unavailability.interface';
import { UpdateUnavailabilityDataDto } from '../dto/unavailability/update/update-unavailability-data.dto';
import { UpdateResponseInterface } from '../../common/interfaces/update-response.interface';
import { RemoveUnavailabilityDto } from '../dto/unavailability/remove/remove-unavailability.dto';
import { DeleteResponseInterface } from '../../common/interfaces/delete-response.interface';
import { GeoUrlApiUtil } from '../utils/geo-url-api.util';
import { MapNewRentalPipe } from '../pipes/map-new-rental.pipe';
import { GeoUrlApiPipe } from '../pipes/geo-url-api.pipe';
import { RequestCoordinatesPipe } from '../pipes/request-coordinates.pipe';
import { RentalDurationPipe } from '../pipes/rental-duration.pipe';
import { GenerateRentalDurationEnumUtil } from '../utils/generate-rental-duration-enum.util';
import { RentalSearchFilterPipe } from '../pipes/rental-search-filter.pipe';
import { PricingPipe } from '../pipes/pricing.pipe';
import { ValidateUnavailabilityPipe } from '../pipes/validate-unavailability.pipe';
import { ProcessUnavailabilityPipe } from '../pipes/process-unavailability.pipe';
import { SortUnavailabilityPipe } from '../pipes/sort-unavailability.pipe';
import { CreateUpdaterDtoPipe } from '../pipes/create-updater-dto.pipe';
import { ValidateRemoveUnavailabilityPipe } from '../pipes/validate-remove-unavailability.pipe';
import { AppConfigService } from '../../config/configuration.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'aws-sdk';
import { MapRentalUtil } from '../utils/map-rental.util';
import { ToItemsIndexes } from '../../common/util/to-item-indexes';

describe('Rental Controller', () => {
  let controller: RentalController;
  let service: RentalService;
  let app: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalController],
      providers: [
        RentalService,
        GeoUrlApiUtil,
        MapNewRentalPipe,
        GeoUrlApiPipe,
        RequestCoordinatesPipe,
        RentalDurationPipe,
        GenerateRentalDurationEnumUtil,
        RentalSearchFilterPipe,
        PricingPipe,
        ValidateUnavailabilityPipe,
        ProcessUnavailabilityPipe,
        ValidateUnavailabilityPipe,
        SortUnavailabilityPipe,
        CreateUpdaterDtoPipe,
        ValidateRemoveUnavailabilityPipe,
        AppConfigService,
        ConfigService,
        MapRentalUtil,
        ToItemsIndexes,
      ],
      imports: [
        MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
        MongooseModule.forFeature([{ name: unavailabilityModel, schema: UnavailabilitySchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
        ConfigModule,
      ],
    }).compile();

    app = module;
    controller = module.get<RentalController>(RentalController);
    service = module.get<RentalService>(RentalService);
  });

  describe('controller is defined', () => {
    it('should be defined', async () => {
      expect(controller).toBeDefined();
    });
  });

  // Spy on the RentalService and mock the createRental method to test continuity of controller and handler
  // currently failing because of Pipes involvement
  describe('createRental endpoint test', () => {
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
    const mockResponse: RentalInterface = {
      pricing: {
        discounts: {
          weekly: 0,
          monthly: 0,
        },
        price: 28
      },
      features: [
        "bike rack",
        "Heated Seats"
      ],
      photos: [],
      _id: "5fc8f6f893cdc33ac0dd18c3",
      rentalTitle: 'this is a fake rental title',
      rentalDescription: "this is a tokyo grocery getter",
      address: "13125 Gascony St Riverview 33578",
      specs: {
        odometer: 20000,
        transmission: "Auto",
        cityMpg: 18,
        hwyMpg: 25,
        mpgE: null,
        fuel: "gas",
        gasGrade: "regular",
        description: "For your adventures, on-road and off",
        make: "Chevrolet",
        model: "Colorado",
        style: "pickup",
        color: "orange",
        numOfSeats: 5,
        numDoors: 4
      },
      registration: {
        vin: "5GAKVCKD1DJ206294",
        licensePlate: "OD5t",
        state: "FL"
      },
      scheduling: {
        requiredNotice: 4,
        rentMinDuration: 1,
        rentMaxDuration: 4
      },
      loc: {
        type: "Point",
        coordinates: [
          27.79382,
          -82.33796
        ]
      },
      listed: true,
      userId: "5fc421feab08792888915744",
      __v: 0
    }
    const user: JwtPayloadInterface = {
      username: 'FakeGuy',
      email: 'fakeguy@gmail.com',
      userId: 'FakeId01'
    }
    it('should pass back the mocked document', async () => {
      jest
        .spyOn(service, 'createRental')
        .mockImplementation(async () => mockResponse);

      expect(await service.createRental(mockedRental, user)).toBe(mockResponse);
    });
  });

  describe('searchRental endpoint test', () => {
    it('should return an array of queried rentals', async () => {
      const mockResponse: RentalInterface[] = [
        {
          "pricing": {
            "discounts": {
              "weekly": 0,
              "monthly": 0
            },
            "price": 28
          },
          "features": [
            "bike rack",
            "Heated Seats"
          ],
          "photos": [],
          "_id": "5fc8f6f893cdc33ac0dd18c3",
          "rentalTitle":"This is a fake rental title",
          "rentalDescription": "this is a tokyo grocery getter",
          "address": "13125 Gascony St Riverview 33578",
          "specs": {
            "odometer": 20000,
            "transmission": "Auto",
            "cityMpg": 18,
            "hwyMpg": 25,
            "mpgE": null,
            "fuel": "gas",
            "gasGrade": "regular",
            "description": "For your adventures, on-road and off",
            "make": "Chevrolet",
            "model": "Colorado",
            "style": "pickup",
            "color": "orange",
            "numOfSeats": 5,
            "numDoors": 4
          },
          "registration": {
            "vin": "5GAKVCKD1DJ206294",
            "licensePlate": "OD5t",
            "state": "FL"
          },
          "scheduling": {
            "requiredNotice": 4,
            "rentMinDuration": 1,
            "rentMaxDuration": 4
          },
          "loc": {
            "type": "Point",
            "coordinates": [
              27.79382,
              -82.33796
            ]
          },
          "listed": true,
          "userId": "5fc421feab08792888915744",
          "__v": 0
        }
      ];
      const mockSearchRentalDto: SearchRentalDto = {
        address: 'muffin lane',
        price: 28,
        features: null,
        rentalDuration: 3,
        loc: {
          type: 'Point',
          coordinates: [39, -50],
        },
        givenNotice: 2,
      };
      jest.spyOn(service, 'searchRental').mockImplementation(async x => mockResponse);
      expect(await service.searchRental(mockSearchRentalDto)).toBe(mockResponse);
    });
  });

  describe('editPrice endpoint test', () => {
    it('should return the updated document, or nothing', async () => {
      const mockResponse: RentalInterface = {
        "pricing": {
          "discounts": {
            "weekly": null,
            "monthly": null
          },
          "price": 28
        },
        "features": [
          "bike rack",
          "Heated Seats"
        ],
        "photos": [],
        "_id": "5fc8f6f893cdc33ac0dd18c3",
        "rentalTitle": "this is a fake rental title",
        "rentalDescription": "this is a tokyo grocery getter",
        "address": "13125 Gascony St Riverview 33578",
        "specs": {
          "odometer": 20000,
          "transmission": "Auto",
          "cityMpg": 18,
          "hwyMpg": 25,
          "mpgE": null,
          "fuel": "gas",
          "gasGrade": "regular",
          "description": "For your adventures, on-road and off",
          "make": "Chevrolet",
          "model": "Colorado",
          "style": "pickup",
          "color": "orange",
          "numOfSeats": 5,
          "numDoors": 4
        },
        "registration": {
          "vin": "5GAKVCKD1DJ206294",
          "licensePlate": "OD5t",
          "state": "FL"
        },
        "scheduling": {
          "requiredNotice": 4,
          "rentMinDuration": 1,
          "rentMaxDuration": 4
        },
        "loc": {
          "type": "Point",
          "coordinates": [
            27.79382,
            -82.33796
          ]
        },
        "listed": true,
        "userId": "5fc421feab08792888915744",
        "__v": 0
      };
      const mockPricingDto: PricingDto = {
        rentalId: '5fc8f6f893cdc33ac0dd18c3',
        price: 28,
        discounts: {
          weekly: null,
          monthly: null,
        },
      };
      jest.spyOn(service, 'editPricing').mockImplementation(async x => mockResponse);
      expect(await service.editPricing(mockPricingDto)).toBe(mockResponse);
    });
  });

  describe('editDetails method test', () => {
    const data: EditDetailsDto = {
      rentalId: "5fc575be2de5f937487a0994",
      specs: {
        odometer: 20000,
        description: "A truck worth driving",
      },
      features: [
        'heated seats'
      ]
    }
    const response: RentalInterface = {
      "pricing": {
        "discounts": {
          "weekly": null,
          "monthly": null
        },
        "price": 28
      },
      "features": [
        "bike rack",
        "Heated Seats"// update
      ],
      "photos": [],
      "_id": "5fc575be2de5f937487a0994",
      "rentalTitle": "this is a fake rental title",
      "rentalDescription": "a truck worth driving", // update
      "address": "13125 Gascony St Riverview 33578",
      "specs": {
        "odometer": 20000,
        "transmission": "Auto",
        "cityMpg": 18,
        "hwyMpg": 25,
        "mpgE": null,
        "fuel": "gas",
        "gasGrade": "regular",
        "description": "For your adventures, on-road and off",
        "make": "Chevrolet",
        "model": "Colorado",
        "style": "pickup",
        "color": "orange",
        "numOfSeats": 5,
        "numDoors": 4
      },
      "registration": {
        "vin": "5GAKVCKD1DJ206294",
        "licensePlate": "OD5t",
        "state": "FL"
      },
      "scheduling": {
        "requiredNotice": 4,
        "rentMinDuration": 1,
        "rentMaxDuration": 4
      },
      "loc": {
        "type": "Point",
        "coordinates": [
          27.79382,
          -82.33796
        ]
      },
      "listed": true,
      "userId": "5fc421feab08792888915744",
      "__v": 0
    };
    it('should edit the details of the rental', async () => {
      jest
        .spyOn(controller, 'editDetails')
        .mockImplementation(async () => response);
      expect(await controller.editDetails(data)).toBe(response);
    })
  })

  describe('schduleUnavailability method test', () => {
    const data: ProcessedUnavailabilityDto = {
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
            "unavailabilityId": "1607051588419",
            "rentalId": "5fbdd52de2357234041850a2",
            "year": 2020,
            "doy": 358,
            "start": 0,
            "end": 24,
            "title": "Christmas Break"
          },
          {
            "unavailabilityId": "1607051588419",
            "rentalId": "5fbdd52de2357234041850a2",
            "year": 2020,
            "doy": 359,
            "start": 0,
            "end": 24,
            "title": "Christmas Break"
          },
          {
            "unavailabilityId": "1607051588419",
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
    const response: UnavailabilityInterface[] = [
      {
        "_id": "5fcd7c063f741a0a048da7b2",
        "unavailabilityId": "1607302150820",
        "rentalId": "5fcd4cb63f741a0a048da7b1",
        "year": 2020,
        "doy": 358,
        "start": 0,
        "end": 24,
        "title": "Christmas Break",
        "__v": 0
      },
      {
        "_id": "5fcd7c063f741a0a048da7b3",
        "unavailabilityId": "1607302150820",
        "rentalId": "5fcd4cb63f741a0a048da7b1",
        "year": 2020,
        "doy": 359,
        "start": 0,
        "end": 24,
        "title": "Christmas Break",
        "__v": 0
      },
      {
        "_id": "5fcd7c063f741a0a048da7b4",
        "unavailabilityId": "1607302150820",
        "rentalId": "5fcd4cb63f741a0a048da7b1",
        "year": 2020,
        "doy": 360,
        "start": 0,
        "end": 24,
        "title": "Christmas Break",
        "__v": 0
      }
    ]
    it('should set a period of unavailability for the rental', async () => {
      jest
        .spyOn(controller, 'scheduleUnavailability')
        .mockImplementation(async () => response)
      expect(await controller.scheduleUnavailability(data)).toBe(response);
    })
  })

  describe('updateUnavailability method test', () => {
    const data: UpdateUnavailabilityDataDto = {
      filter: {
        rentalId: "5fbdd52de2357234041850a2",
        unavailabilityId: "1606606517860",
      },
      updater: {
          start: 0,
          end: 12, // the new ending
          title: "New Years Unavailability"
      }
    }
    const response: UpdateResponseInterface = {
      n: 1,
      nModified: 1,
      opTime: {
        ts: 6902971751387365377,
        t: 7,
      },
      electionId: '7fffffff0000000000000007',
      ok: 1,
      $clusterTime: {
        clusterTime: '6902971751387365377',
        signature: {
          hash: "45kr8AZX4hbr/jLV+rsXf3bSp2Q=",
          keyId: "6888134215632683011"
        }
      }
    }
    it('should edit an Unavailability on the rental', async () => {
      jest
        .spyOn(controller, 'updateUnavailability')
        .mockImplementation(async () => response);
      expect(await controller.updateUnavailability(data)).toBe(response);
    });
  });
  
  describe('removeUnavailability method test', () => {
    const data: RemoveUnavailabilityDto = {
      rentalId: "5fc8f6f893cdc33ac0dd18c3",
      unavailabilityId: "1607303955713"
    }
    const response: DeleteResponseInterface = {
      "n": 3,
    "opTime": {
        "ts": "6903318441147498499",
        "t": 7
    },
    "electionId": "7fffffff0000000000000007",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6903318441147498499",
        "signature": {
            "hash": "+X3n4ODnRXi8Z5Z0Rbx+38Tyu6o=",
            "keyId": "6888134215632683011"
        }
    },
    "operationTime": "6903318441147498499",
    "deletedCount": 3
    }
    it('should remove an existing unavailability from the selected rental', async () => {
      jest
        .spyOn(controller, 'removeUnavailability')
        .mockImplementation(async () => response);
      expect(await controller.removeUnavailability(data)).toBe(response);
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
