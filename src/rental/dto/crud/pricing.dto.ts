/**
 * summary: edit the pricing of a rental
 * - passed to the rental.service.editPricing method
 */
export class PricingDto {
    rentalId: string;
    price: number;
    discounts: {
        weekly: number;
        monthly: number;
    };
}
