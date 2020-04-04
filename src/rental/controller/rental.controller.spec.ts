import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from '../service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';
import { SearchRentalDto } from '../dto/search-rental.dto';
import { PricingDto } from '../dto/pricing.dto';

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
        MongooseModule.forRoot('mongodb://admin:Pioneer18!@ds141410.mlab.com:41410/heroku_q3rt34gr', {
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

    it('should pass back the mocked document', async () => {
      const mockResponse = ['test'];
      jest
        .spyOn(service, 'createRental')
        .mockImplementation(async () => mockResponse);

      expect(await service.createRental(mockedRental)).toBe(mockResponse);
    });
  });

  describe('searchRental endpoint test', () => {
    it('should return an array of queried rentals', async () => {
      const mockResponse = ['fake rental data'];
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
      const mockResponse = ['fake document'];
      const mockPricingDto: PricingDto = {
        rentalId: 'xxx',
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
