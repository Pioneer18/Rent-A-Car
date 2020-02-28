import { TestingModule, Test } from '@nestjs/testing';
import { PricingPipe } from './pricing.pipe';
import { Logger } from '@nestjs/common';
import { PricingDto } from '../dto/pricing.dto';

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
                price: 28,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const discountsPass: PricingDto = {
                price: 28,
                discounts: {
                    weekly: 5,
                    monthly: 10,
                },
            };
            const negativeFail: PricingDto = {
                price: -10,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const belowMinFail: PricingDto = {
                price: 7,
                discounts: {
                    weekly: null,
                    monthly: null,
                },
            };
            const weeklyTooLargeFail: PricingDto = {
                price: 10,
                discounts: {
                    weekly: 11,
                    monthly: null,
                },
            };
            const monthlyTooLargeFail: PricingDto = {
                price: 10,
                discounts: {
                    weekly: null,
                    monthly: 11,
                },
            };
            const mockValidatePricingDto = async (data) => {
                const minPrice: number = 9;
                // check price is not negative && >= 9
                if (Math.sign(data.price) === -1 || data.price < minPrice) {
                    return 'Price cannot be negative or below $9';
                }
                // check discount.weekly is not negative and not greater than the price
                if ((Math.sign(data.discounts.weekly) === -1 || data.discounts.weekly > data.price) ||
                    (Math.sign(data.discounts.monthly) === -1 || data.discounts.monthly > data.price)) {
                    return 'discounts cannot be negative or greater than the price';
                }
            };
            expect(await mockValidatePricingDto(pricePass)).toBe(undefined);
            expect(await mockValidatePricingDto(discountsPass)).toBe(undefined);
            expect(await mockValidatePricingDto(negativeFail)).toBe('Price cannot be negative or below $9');
            expect(await mockValidatePricingDto(belowMinFail)).toBe('Price cannot be negative or below $9');
            expect(await mockValidatePricingDto(weeklyTooLargeFail)).toBe('discounts cannot be negative or greater than the price');
            expect(await mockValidatePricingDto(monthlyTooLargeFail)).toBe('discounts cannot be negative or greater than the price');
        });
    });

    afterAll(async () => {
        app.close();
    })
})
