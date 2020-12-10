/**
 * **summary** Interface for the rental.service.editPricing() method's MongoDB update object
 */
export interface EditPricingUpdater {
        pricing: {
            price: number;
            discounts: {
                weekly: number;
                monthly: number;
            }
        },
}
