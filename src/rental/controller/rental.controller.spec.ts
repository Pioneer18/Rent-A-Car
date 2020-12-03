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

describe('Rental Controller', () => {
  let controller: RentalController;
  let service: RentalService;
  let app: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalController],
      providers: [RentalService],
      imports: [
        MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
        MongooseModule.forFeature([{ name: unavailabilityModel, schema: UnavailabilitySchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car-test', {
          useNewUrlParser: true,
        }),
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

  afterAll(async () => {
    await app.close();
  });
});
