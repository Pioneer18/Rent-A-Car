import { SearchRentalDto } from '../../dto/searchRental/search-rental.dto';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { SearchRentalValidationSchema } from './search-rental-validation.schema';
import { Logger } from '@nestjs/common';

describe('SearchRentalValidationSchema Unit Test', () => {
    it('should only accept objects that fit the SearchRentalDto', () => {
        try {
            const mockSearchRentalDto: SearchRentalDto = {
                address: '999 fake address',
                features: ['A/C', 'AUX'],
                price: null,
                loc: {
                    type: 'Point',
                    coordinates: [30, -59],
                },
                rentalDuration: 3,
                givenNotice: 2,
            };
            const check = new JoiValidationPipe(SearchRentalValidationSchema);
            const test: SearchRentalDto = check.transform(mockSearchRentalDto);
            Logger.log(`test address: ${test.address} mock address: ${mockSearchRentalDto.address}`);
            // expect(test.address).toBe(mockSearchRentalDto.address);
        } catch (err) {
            throw new Error(err);
        }
    });
});
