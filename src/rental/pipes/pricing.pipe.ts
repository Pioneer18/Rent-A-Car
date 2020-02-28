import { Injectable, PipeTransform } from '@nestjs/common';
import { PricingDto } from '../dto/pricing.dto';

/**
 * validate incoming price and discounts
 * map the dto before sending to handler
 */
@Injectable()
export class PricingPipe implements PipeTransform {

    minPrice = parseInt(process.env.MIN_PRICE, 10);

    private validatePricingDto = async (data: PricingDto) => {
        // check price is not negative && >= 9
        if (Math.sign(data.price) === -1 || data.price < this.minPrice) {
            throw new Error('Price cannot be negative or below $9');
        }
        // check discount.weekly is not negative and not greater than the price
        if ((Math.sign(data.discounts.weekly) === -1 || data.discounts.weekly > data.price) ||
            (Math.sign(data.discounts.monthly) === -1 || data.discounts.monthly > data.price)) {
            throw new Error('discounts cannot be negative or greater than the price');
        }
    }

    async transform(value: PricingDto) {
        this.validatePricingDto(value);
    }
}