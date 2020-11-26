/**
 * **summary**: edit the pricing of a rental
 * - passed to the rental.service.editPricing method
 */
export class PricingDto {
    rentalId: string;
    price: number | null;
    discounts: {
        weekly: number | null;
        monthly: number | null;
    };
}
