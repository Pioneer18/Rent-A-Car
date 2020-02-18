import { Test, TestingModule } from '@nestjs/testing';
import { RentalService } from './rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';

describe('RentalService', () => {
  let service: RentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'Rental', schema: RentalSchema }]),
        MongooseModule.forRoot('mongodb://localhost/rent-a-car', {
          useNewUrlParser: true,
        }),
      ],
      providers: [RentalService],
    }).compile();

    service = module.get<RentalService>(RentalService);
  });

  /**
   * Verify dependencies
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Test the properties of the RentalService Class:
   * 1) createRental
   * 2) searchRental
   * 3) editPricing
   * 4) editDetails
   * 5) scheduleUnavailability
   */
});
