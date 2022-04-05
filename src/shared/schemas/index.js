const Joi = require('joi');

const emailSchema = Joi.string().email().trim().messages({
    'string.email': 'Invalid email',
});

const phoneSchema = Joi.string()
    .trim()
    .regex(/^[0-9]+$/i)
    .min(8)
    .max(14)
    .messages({
        'string.pattern.base': 'Invalid phone number',
    });

module.exports = { emailSchema, phoneSchema };