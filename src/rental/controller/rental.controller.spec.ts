import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from '../service/rental.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalSchema } from '../schema/rental.schema';

describe('Rental Controller', () => {
  let controller: RentalController;

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

    controller = module.get<RentalController>(RentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * 1) Test connectivity to service endpoints; simulate calling a handler with a mocked service?
   * This would test that if controller handler called, the service is indeed called as well.
   * Testing that continuity for each handler is enough for the controller, that's it's job. For E2E
   * Simulated HTTP requests, set this up in the module, not the controller or handler.
   */
});
