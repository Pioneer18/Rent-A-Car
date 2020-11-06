import * as joi from '@hapi/joi';
/**
 * Validate requested new User before passing to handler
 */
export const CreateUserValidation = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
})