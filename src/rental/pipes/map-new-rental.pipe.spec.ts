import { TestingModule, Test } from '@nestjs/testing';
import { MapNewRentalPipe } from './map-new-rental.pipe';

describe('MapNewRentalPipe Unit Test', () => {

    let pipe: MapNewRentalPipe;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MapNewRentalPipe],
        }).compile();
        pipe = module.get<MapNewRentalPipe>(MapNewRentalPipe);
    });

    describe('check the pipe is defined', () => {
        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });
    });

});
