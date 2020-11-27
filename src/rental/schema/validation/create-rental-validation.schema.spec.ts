import { CreateRentalDto } from '../../dto/createRental/create-rental.dto';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';
import { CreateRentalValidationSchema } from '../validation/create-rental-validation.schema';

describe('CreateRentalValidationSchema Unit Test', () => {
  it('should only accept objects that fit the MapRentalInterface', () => {
    const rental: CreateRentalDto = {
      rentalDescription: 'Tokyo grocery getter',
      address: '204 W Washington St, Lexington, VA 24450',
      specs: {
        odometer: 230000,
        transmission: 'Automatic',
        cityMpg: 28,
        hwyMpg: 33,
        fuel: 'gas',
        gasGrade: 'regular',
        description: 'This is a tokyo grocery getter',
        make: 'Honda',
        model: 'Fit',
        style: 'sport',
        color: 'yellow',
        numOfSeats: 5,
        numDoors: 4,
      },
      registration: {
        vin: '511892000',
        licensePlate: 'J51Y45',
        state: 'FL',
      },
      features: ['A/C', 'AUX'],
      scheduling: {
        requiredNotice: 4,
        rentMinDuration: 4,
        rentMaxDuration: 1,
      },
      pricing: {
        price: 28,
        discounts: {
          weekly: 0,
          monthly: 0,
        },
      },
      photos: [],
      loc: {
        type: 'Point',
        coordinates: [37.786152, -79.443008],
      },
      listed: true,
    };
    const check = new JoiValidationPipe(CreateRentalValidationSchema);
    expect(check.transform(rental)).toEqual(rental);
  });
});
