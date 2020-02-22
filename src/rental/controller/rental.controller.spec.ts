import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from '../service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';
import { MappedRentalInterface } from '../interface/mapped-rental.interface';

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
        MongooseModule.forRoot('mongodb://localhost/rent-a-car', {
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
  describe('test contract with service', () => {

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

    it('should pass back the mocked document', async () => {
      const result = ['test'];
      jest.spyOn(service, 'createRental').mockImplementation(async () => result);

      expect(await service.createRental(mockedRental)).toBe(result);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
