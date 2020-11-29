/**
 * **summary** Interface for the rental.service.editPricing() method's MongoDB update object
 */
export interface EditPricingUpdater {
    $set: {
        pricing: {
            price: number;
            discounts: {
                weekly: number;
                monthly: number;
            }
        }
    }
}