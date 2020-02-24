import { RentalDurations } from '../../const';
import * as joi from '@hapi/joi';
/**
 * Validate SearchRentalDto
 */
export const SearchRentalValidationSchema = joi.object({
  address: joi.string().required(),
  features: joi.array().items(joi.string()),
  price: joi.string(),
  rentalDuration: joi.number().required(),
  loc: {
    type: joi.string().required(),
    coordinates: joi
      .array()
      .items(joi.number(), joi.number())
      .required(),
  },
  givenNotice: joi.number().required(),
});
