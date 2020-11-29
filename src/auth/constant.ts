/**
 * **summary**: Holds the secret key and expiration time of the JWT token for the Passport Jwt-Strategy
 */
export const jwtConstants = {
    secret: process.env.SECRET_KEY,
    jwt_exp_time: process.env.JWT_EXP_TIME,
};
