import * as joi from '@hapi/joi';
/**
 * Validate PricingDto
 */
export const PricingValidation = joi.object({
    rentalId: joi.string().required(),
    price: joi.number().min(9).positive().required(),
    discounts: {
        weekly: joi.number().positive(),
        monthly: joi.number().positive(),
    },
});
