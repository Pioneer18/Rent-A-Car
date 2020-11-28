/**
 * **summary**: Interface for the rental.service.editPricing() method
 */
export interface EditPricingInterface {
    rentalId: string;
    price: number | null;
    discounts: {
        weekly: number | null;
        monthly: number | null;
    };
}