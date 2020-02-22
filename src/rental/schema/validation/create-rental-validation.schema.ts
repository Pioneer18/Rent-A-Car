import * as joi from '@hapi/joi';
/**
 * Validate requested new rental before passing to the handler
 */
export const CreateRentalValidation = joi.object({
    rentalDescription: joi.string(),
    address: joi.string().required(),
    specs: joi.object({
        odometer: joi.number().required(),
        transmission: joi.string().required(),
        cityMpg: joi.number().required(),
        hwyMpg: joi.number().required(),
        fuel: joi.string().required(),
        gasGrade: joi.string().required(),
        description: joi.string().required(),
        model: joi.string().required(),
        style: joi.string().required(),
        color: joi.string().required(),
        numOfSeats: joi.number().required(),
        numDoors: joi.number().required(),
        driveAssist: joi.boolean(),
        rearviewCam: joi.boolean(),
        bluetooth: joi.boolean(),
        sunRoof: joi.boolean(),
    }),
    registration: joi.object({
        vin: joi.number().required(),
        licensePlate: joi.string().required(),
        state: joi.string().required(),
    }),
    features: joi.array().items(joi.string()),
    scheduling: joi.object({
        requiredNotice: joi.number().required(),
        rentMinDuration: joi.number().required(),
        rentMaxDuration: joi.number().required(),
    }),
    pricing: joi.object({
        price: joi.number().required(),
        discounts: joi.object({
            weekly: joi.number(),
            monthly: joi.number(),
        }),
    }),
    loc: joi.object({
        type: joi.string().required(),
        coordinates: joi.array().items(joi.number()).length(2).required(),
    }),
    photos: joi.array().items(joi.string()),
    listed: joi.boolean().required(),
});
