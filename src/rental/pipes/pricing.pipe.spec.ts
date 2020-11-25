import { TestingModule, Test } from '@nestjs/testing';
import { PricingPipe } from './pricing.pipe';
import { PricingDto } from '../dto/pricing/pricing.dto';

describe('PricingPipe Unit Test', () => {

    let app: TestingModule;
    let pipe: PricingPipe;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PricingPipe],
        }).compile();
        app = module;
        pipe = module.get<PricingPipe>(PricingPipe);
    });

    describe('validatePricingDto method test', () => {
        it('should validate price and discounts are not negative nor have illogical values', async () => {
            // do stuffs
            const pricePass: PricingDto = {
                rentalId: 'xxx',
                price: 28,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const discountsPass: PricingDto = {
                rentalId: 'xxx',
                price: 28,
                discounts: {
                    weekly: 5,
                    monthly: 10,
                },
            };
            const negativeFail: PricingDto = {
                rentalId: 'xxx',
                price: -10,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const belowMinFail: PricingDto = {
                rentalId: 'xxx',
                price: 7,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const weeklyTooLargeFail: PricingDto = {
                rentalId: 'xxx',
                price: 10,
                discounts: {
                    weekly: 11,
                    monthly: null,
                },
            };
            const monthlyTooLargeFail: PricingDto = {
                rentalId: 'xxx',
                price: 10,
                discounts: {
                    weekly: null,
                    monthly: 11,
                },
            };
            const invalidRentalIdFail: PricingDto = {
                rentalId: null,
                price: 10,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const mockValidatePricingDto = async (data: PricingDto) => {
                const minPrice: number = 9;
                // check rentalID
                if (!data.rentalId || (typeof data.rentalId !== 'string')) {
                    return('Invalid rentalID');
                }
                // check price is not negative && >= 9
                if (Math.sign(data.price) === -1 || data.price < minPrice) {
                    return 'Price cannot be negative or below $9';
                }
                // check discount.weekly is not negative and not greater than the price
                if ((Math.sign(data.discounts.weekly) === -1 || data.discounts.weekly > data.price) ||
                    (Math.sign(data.discounts.monthly) === -1 || data.discounts.monthly > data.price)) {
                    return 'Discounts cannot be negative or greater than the price';
                }
            };
            expect(await mockValidatePricingDto(pricePass)).toBe(undefined);
            expect(await mockValidatePricingDto(discountsPass)).toBe(undefined);
            expect(await mockValidatePricingDto(negativeFail)).toBe('Price cannot be negative or below $9');
            expect(await mockValidatePricingDto(belowMinFail)).toBe('Price cannot be negative or below $9');
            expect(await mockValidatePricingDto(weeklyTooLargeFail)).toBe('Discounts cannot be negative or greater than the price');
            expect(await mockValidatePricingDto(monthlyTooLargeFail)).toBe('Discounts cannot be negative or greater than the price');
            expect(await mockValidatePricingDto(invalidRentalIdFail)).toBe('Invalid rentalID');
        });
    });

    describe('mapPricingDto method test', () => {
        it('should return a complete pricingDto', async () => {
            const test1: PricingDto = {
                rentalId: 'xxx',
                price: 28,
                discounts: {
                    weekly: 5,
                    monthly: 10,
                },
            };
            const test2: PricingDto = {
                rentalId: 'xxx',
                price: 10,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            expect((await pipe.transform(test1)).price).toBe(test1.price);
            expect((await pipe.transform(test1)).discounts.weekly).toBe(test1.discounts.weekly);
            expect((await pipe.transform(test1)).discounts.monthly).toBe(test1.discounts.monthly);
            expect((await pipe.transform(test2)).price).toBe(test2.price);
            expect((await pipe.transform(test2)).discounts.weekly).toBe(test2.discounts.weekly);
            expect((await pipe.transform(test2)).discounts.monthly).toBe(test2.discounts.monthly);
        });
    });

    afterAll(async () => {
        app.close();
    });
});
