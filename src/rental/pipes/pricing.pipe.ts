import { Injectable, PipeTransform} from '@nestjs/common';
import { PricingDto } from '../dto/pricing/pricing.dto';

/**
 * summary: validate incoming price and discounts and map data into a PricingDto before sending to handler
 */
@Injectable()
export class PricingPipe implements PipeTransform {

    /**
     * summary: validate the price and discounts do not have negative values nor violate common sense
     * @param data the raw user request to update the Rental's pricing
     */
    private validatePricingDto = async (data: PricingDto) => {
        const minPrice: number = parseInt(process.env.MIN_PRICE, 10);
        // check rentalId
        if (!data.rentalId || (typeof data.rentalId !== 'string')) {
            throw new Error('Invalid rentalID');
        }
        // check price is not negative && >= 9
        if (Math.sign(data.price) === -1 || data.price < minPrice) {
            throw new Error('Price cannot be negative or below $9');
        }
        // check discount.weekly is not negative and not greater than the price
        if ((Math.sign(data.discounts.weekly) === -1 || data.discounts.weekly > data.price) ||
            (Math.sign(data.discounts.monthly) === -1 || data.discounts.monthly > data.price)) {
            throw new Error('Discounts cannot be negative or greater than the price');
        }
    }

    /**
     * summary: map the final values of the PricingDto before passing to the handler
     * @param 
     */
    private mapPricingDto = async (data: PricingDto) => {
        const value: PricingDto = {
            rentalId: data.rentalId,
            price: data.price ? data.price : null,
            discounts: {
                weekly: data.discounts.weekly ? data.discounts.weekly : null,
                monthly: data.discounts.monthly ? data.discounts.monthly : null,
            },
        };
        return value;
    }

    /**
     * summary: use the validatePricingDto() and mapPricingDto() methods to prepare the data for the request handler
     * @param value the raw request from a user to update the pricing of a Rental
     */
    async transform(value: PricingDto) {
        try {
            await this.validatePricingDto(value);
            const data: PricingDto = await this.mapPricingDto(value);
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
}