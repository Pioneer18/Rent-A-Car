import { Test, TestingModule } from '@nestjs/testing';
import { GivenNoticePipe } from './given-notice.pipe';
/**
 * What does this pipe do?
 * summary:
 * Accepts a RawSearchRentalDto and returns a PostGivenNoticeDto
 * creates a givenNotice
 * validatesRequestedTime
 * Tests:
 * #1 transform:
 * expect a PostGivenNotice from a valid given RawSearchRentalDto
 * expect an Error if an invalid RawSearchRentalDto is given
 * #2 createGivenNotice:
 * expect a number of milliseconds >= 3600000
 * expect an Error otherwise
 * #3 validateRequestedTime
 * expect an Error if startTime > endTime
 * expect an Error if there is less than an hour difference between the rental start and end time
 * expect a returned number greater than 3600000
 */
describe('GivenNoticePipe Unit Test', () => {

    let pipe: GivenNoticePipe;
    let app: TestingModule;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GivenNoticePipe],
        }).compile();
        pipe = module.get<GivenNoticePipe>(GivenNoticePipe);
        app = module;
    });

    describe('GivenNoticePipe definition unit test', () => {
        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });
    });

    describe('transform unit test', () => {
        it('should..', async () => {
            // do stuffs
        });
    });

    describe('createGivenNotice unit test', () => {
        it('should..', async () => {
            // do stuffs
        });
    });

    describe('validateRequestedTime unit test', () => {
        it('should..', async () => {
            // do stuffs
        });
    });

    afterAll(async () => {
        app.close();
    });
});
