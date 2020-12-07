import { Test, TestingModule } from '@nestjs/testing';
import { ToItemsIndexes } from './to-item-indexes';

describe('ToItemIndex Unit Test', () => {
    let toItem: ToItemsIndexes;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ToItemsIndexes],
        }).compile()
        toItem = module.get<ToItemsIndexes>(ToItemsIndexes);
    });

    describe('definition test', () => {
        it('should be defined', async () => {
            expect(toItem).toBeDefined();
        })
    })
})