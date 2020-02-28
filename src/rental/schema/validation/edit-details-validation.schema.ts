import * as joi from '@hapi/joi';
/**
 * Validate EditDetailsDto
 */
export const EditDetailsValidation = joi.object({
    specs: joi.object({
        odometer: joi.number(),
        transmission: joi.string(),
        cityMpg: joi.number(),
        hwyMpg: joi.number(),
        fuel: joi.string(),
        gasGrade: joi.string(),
        description: joi.string(),
        model: joi.string(),
        style: joi.string(),
        color: joi.string(),
        numOfSeats: joi.number(),
        numDoors: joi.number(),
        driveAssist: joi.boolean(),
        rearviewCam: joi.boolean(),
        bluetooth: joi.boolean(),
        sunRoof: joi.boolean(),
    }),
    features: joi.array().items(joi.string()),
});
