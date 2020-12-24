import { Test, TestingModule } from '@nestjs/testing';
import { UnavailabilityController } from './unavailability.controller';

describe('Unavailability Controller', () => {
  let controller: UnavailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnavailabilityController],
    }).compile();

    controller = module.get<UnavailabilityController>(UnavailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
