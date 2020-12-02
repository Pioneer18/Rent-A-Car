import { TestingModule, Test } from '@nestjs/testing';
import { ValidateEditDetailsPipe } from './validate-edit-details.pipe';
import { EditDetailsDto } from '../dto/details/edit-details.dto';
import { PositiveNumber } from '../../common/util/positive-number';
import { TypeOfValue } from '../../common/util/typeof-value';
import { Logger } from '@nestjs/common';

describe('ValidateEditDetailsPipe Unit Test', () => {
    let app: TestingModule;
    let pipe: ValidateEditDetailsPipe;
    let val: TypeOfValue;
    let pos: PositiveNumber;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PositiveNumber, TypeOfValue],
            providers: [ValidateEditDetailsPipe],
        }).compile();
        app = module;
        pipe = module.get<ValidateEditDetailsPipe>(ValidateEditDetailsPipe);
        val = module.get<TypeOfValue>(TypeOfValue);
        pos = module.get<PositiveNumber>(PositiveNumber);
    });

    const validateDetails = async (value: EditDetailsDto) => {
        const result: any = {
            rentalId: null,
            noVal: null,
            odometer: null,
            transmission: null,
            cityMpg: null,
            hwyMpg: null,
            fuel: null,
            gasGrade: null,
            description: null,
            model: null,
            style: null,
            color: null,
            numOfSeats: null,
            numDoors: null,
            features: null,
        };
        // check rentalId
        if (!value.rentalId || !val.validate(value.rentalId, 'string')) {
            result.rentalId = 'Invalid rental id';
        }
        // must have at least one detail to update
        if (!value.specs && !value.features) {
            result.noVal = 'Invalid request, no details given';
        }
        // validate each spec value
        if (value.specs) {
            if (value.specs.odometer &&
                !val.validate(value.specs.odometer, 'number') || !pos.validate(value.specs.odometer)
                ) {
                    result.odometer = 'Odometer must be a positive number';
                }
            if (value.specs.transmission &&
                !val.validate(value.specs.transmission, 'string')) {
                    result.transmission = 'transmission must be a valid value (string)';
                }
            if (value.specs.cityMpg &&
                !val.validate(value.specs.cityMpg, 'number') || !pos.validate(value.specs.cityMpg)) {
                    result.cityMpg = 'cityMpg must be a positive number';
                }
            if (value.specs.hwyMpg &&
                !val.validate(value.specs.hwyMpg, 'number') || !pos.validate(value.specs.hwyMpg)) {
                    result.hwyMpg = 'hwyMpg must be a positive number';
                }
            if (value.specs.fuel &&
                !val.validate(value.specs.fuel, 'string')) {
                    result.fuel = 'fuel must be a valid value (string)';
                }
            if (value.specs.gasGrade &&
                !val.validate(value.specs.gasGrade, 'string')) {
                    result.gasGrade = 'gasGrade must be a valid value (string)';
                }
            if (value.specs.description &&
                !val.validate(value.specs.description, 'string')) {
                    result.description = 'description must be a valid value (string)';
                }
            if (value.specs.model &&
                !val.validate(value.specs.model, 'string')) {
                    result.model = 'model must be a valid value (string)';
                }
            if (value.specs.style &&
                !val.validate(value.specs.style, 'string')) {
                    result.style = 'style must be a valid value (string)';
                }
            if (value.specs.color &&
                !val.validate(value.specs.color, 'string')) {
                    result.color = 'color must be a valid value (string)';
                }
            if (value.specs.numOfSeats &&
                !val.validate(value.specs.numOfSeats, 'number') || !pos.validate(value.specs.numOfSeats)) {
                    result.numOfSeats = 'numOfSeats must be a positive number';
                }
            if (value.specs.numDoors &&
                !val.validate(value.specs.numDoors, 'number') || !pos.validate(value.specs.numDoors)) {
                    result.numDoors = 'numDoors must be a positive number';
                }
        }
        if (value.features) {
            if (value.features.length > 0) {
                for (const x of value.features) {
                    if (!val.validate(x, 'string')) {
                        result.features = 'features must be valid values (string)';
                    }
                }
            }
        }
        return result;
    };

    describe('ValidateEditDetailsPipe definition test', () => {
        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });
    });

    describe('transform method unit test', () => {
        it('should return a valid EditDetailsDto', async () => {
            // do stuff
            const test: EditDetailsDto = {
                rentalId: 'xxx',
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
                  features: ['A/C', 'AUX'],
            };
            expect((await pipe.transform(test)).rentalId).toBe(test.rentalId);
            expect((await pipe.transform(test)).specs.odometer).toBe(test.specs.odometer);
            expect((await pipe.transform(test)).specs.transmission).toBe(test.specs.transmission);
            expect((await pipe.transform(test)).specs.cityMpg).toBe(test.specs.cityMpg);
            expect((await pipe.transform(test)).specs.hwyMpg).toBe(test.specs.hwyMpg);
            expect((await pipe.transform(test)).specs.fuel).toBe(test.specs.fuel);
            expect((await pipe.transform(test)).specs.gasGrade).toBe(test.specs.gasGrade);
            expect((await pipe.transform(test)).specs.description).toBe(test.specs.description);
            expect((await pipe.transform(test)).specs.model).toBe(test.specs.model);
            expect((await pipe.transform(test)).specs.style).toBe(test.specs.style);
            expect((await pipe.transform(test)).specs.color).toBe(test.specs.color);
            expect((await pipe.transform(test)).specs.numOfSeats).toBe(test.specs.numOfSeats);
            expect((await pipe.transform(test)).specs.numDoors).toBe(test.specs.numDoors);
            expect((await pipe.transform(test)).features[0]).toBe(test.features[0]);
            expect((await pipe.transform(test)).features[1]).toBe(test.features[1]);
        });
    });

    describe('validateDetails method test', () => {
        it('should verify there is at least one value, and all values are valid', async () => {
            // failing test
            const fail: any = {
                rentalId: 7,
                specs:  {
                    odometer: '120000',
                    transmission: 0,
                    cityMpg: '28',
                    hwyMpg: '33',
                    fuel: 0,
                    gasGrade: 0,
                    description: 0,
                    make: 0,
                    model: 0,
                    style: 0,
                    color: 0,
                    numOfSeats: 'string',
                    numDoors: 'string',
                },
                features: [0, 0],
            };
            // passing test
            const pass: EditDetailsDto = {
                rentalId: 'xxx',
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
                features: ['fake feature'],
            };
            // Passing Test
            expect((await validateDetails(pass)).rentalId).toBe(null);
            expect((await validateDetails(pass)).noVal).toBe(null);
            expect((await validateDetails(pass)).odometer).toBe(null);
            expect((await validateDetails(pass)).transmission).toBe(null);
            expect((await validateDetails(pass)).cityMpg).toBe(null);
            expect((await validateDetails(pass)).hwyMpg).toBe(null);
            expect((await validateDetails(pass)).fuel).toBe(null);
            expect((await validateDetails(pass)).gasGrade).toBe(null);
            expect((await validateDetails(pass)).description).toBe(null);
            expect((await validateDetails(pass)).model).toBe(null);
            expect((await validateDetails(pass)).style).toBe(null);
            expect((await validateDetails(pass)).color).toBe(null);
            expect((await validateDetails(pass)).numOfSeats).toBe(null);
            expect((await validateDetails(pass)).numDoors).toBe(null);
            expect((await validateDetails(pass)).features).toBe(null);
            // failing test
            /*expect((await validateDetails(fail)).rentalId).toBe('Invalid rental id');
            expect((await validateDetails(fail)).noVal).toBe('Invalid request, no details given');
            expect((await validateDetails(fail)).odometer).toBe('Odometer must be a positive number');
            expect((await validateDetails(fail)).transmission).toBe('transmission must be a valid value (string)');
            expect((await validateDetails(fail)).cityMpg).toBe('cityMpg must be a positive number');
            expect((await validateDetails(fail)).hwyMpg).toBe('hwyMpg must be a positive number');
            expect((await validateDetails(fail)).fuel).toBe('fuel must be a valid value (string)');
            expect((await validateDetails(fail)).gasGrade).toBe('gasGrade must be a valid value (string)');
            expect((await validateDetails(fail)).description).toBe('description must be a valid value (string)');
            expect((await validateDetails(fail)).model).toBe('model must be a valid value (string)');
            expect((await validateDetails(fail)).style).toBe('style must be a valid value (string)');
            expect((await validateDetails(fail)).color).toBe('color must be a valid value (string)');
            expect((await validateDetails(fail)).numOfSeats).toBe('numOfSeats must be a positive number');
            expect((await validateDetails(fail)).numDoors).toBe('numDoors must be a positive number');
            expect((await validateDetails(fail)).features).toBe('features must be valid values (string)');*/
        });
    });

    afterAll(async () => {
        app.close();
    });
});
