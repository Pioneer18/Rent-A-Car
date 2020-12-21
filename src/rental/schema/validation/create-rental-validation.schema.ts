import * as joi from '@hapi/joi';
/**
 * **summary**: Validate requested new rental before passing to the handler
 * - fuel: when the selected fuel type is electric and not gas or hybrid, several fields must change their validation
 *   - mpgE: the metric for electric mileage. When the selected fuel type is electric, mpgE is required, otherwise it must be null
 *   - cityMpg: the metric for gas mileage in the city. cityMpg must be null if the fuel type is electric
 *   - hwyMpg: the metric for gas mileage on the highway. hwyMpg must be null if the fuel type is electric
 *   - gasGrade: the gas grade must be 'N/A' if the selected fuel type is electric
 */
export const CreateRentalValidationSchema = joi.object({
  userId: joi.string().required,
  rentalTitle: joi.string().required(),
  rentalDescription: joi.string().required(),
  address: joi.string().required(),
  specs: joi.object({
    odometer: joi.number().required(),
    transmission: joi.string().required(),
    cityMpg: joi.number().required()
      .when('fuel', {is: 'electric', then: joi.valid(null)}),
    hwyMpg: joi.number().required()
      .when('fuel', {is: 'electric', then: joi.valid(null)}),
    mpgE: joi.number()
      .when('fuel', {is: 'electric', then: joi.number().required()})
      .when('fuel', {not: 'electric', then: joi.valid(null) }),
    fuel: joi.string().valid('gas', 'hybrid', 'electric').required(),
    gasGrade: joi.string().valid('regular', 'mid', 'premium', 'N/A', 'diesel').required()
      .when('fuel', {is: 'electric', then: joi.valid('N/A')}),
    description: joi.string().required(),
    make: joi.string().required(),
    model: joi.string().required(),
    style: joi.string().required(),
    color: joi.string().required(),
    numOfSeats: joi.number().required(),
    numDoors: joi.number().required(),
  }),
  registration: joi.object({
    vin: joi.string().required(),
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
    coordinates: joi
      .array()
      .items(joi.number())
      .length(2)
      .required(),
  }),
  photos: joi.array().items(joi.string()),
  listed: joi.boolean().required(),
});
