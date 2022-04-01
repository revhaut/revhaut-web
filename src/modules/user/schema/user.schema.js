const Joi = require('joi');
const Schema = require('../../../shared/schemas');

const userSchema = {
    createAccountSchema: Joi.object({
        first_name: Joi.string().required().trim().label('first_name'),
        last_name: Joi.string().required().trim().label('last_name'),
        email: Schema.emailSchema.required().label('email'),
        phone: Joi.string().required().label('phone'),
        password: Joi.string().required().label('Password'),
        user_type: Joi.string().required().label('user_type'),
        state: Joi.string().required().trim().label('state'),
        country: Joi.string().required().trim().label('country'),
    }),
    // accountVerification: Joi.object({
    //     email: emailSchema.required().label('email'),
    //     token: Joi.string().required().trim().label('token'),
    // }),
};

module.exports = userSchema;