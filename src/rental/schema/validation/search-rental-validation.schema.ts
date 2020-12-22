import { RentalDurations } from '../../const';
import * as joi from '@hapi/joi';
/**
 * **summary**: Validate an incoming SearchRentalDto
 */
export const SearchRentalValidationSchema = joi.object({
  address: joi.string().required(),
  features: joi.array().items(joi.string()).required().allow(null),
  price: joi.number().required().allow(null),
  rentalDuration: joi.number().required().allow(null),
  loc: {
    type: joi.string().required(),
    coordinates: joi
      .array()
      .items(joi.number(), joi.number())
      .required(),
  },
  givenNotice: joi.number().required().allow(null),
  radius: joi.number().required()
});
