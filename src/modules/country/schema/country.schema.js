const Joi = require('joi');

const countrySchema = {
    stateSchema: Joi.object({
        country_code: Joi.string().required().trim().label('country_code'),
    }),

};

module.exports = countrySchema;