const Joi = require('joi');
const Schema = require('../../../shared/schemas');

const productSchema = {
  createProduct: Joi.object({
    category: Joi.string().required().trim().label('category'),
    description: Joi.string().required().trim().label('description'),
    product_slug: Joi.string().required().trim().label('product_slug'),
    default_email: Joi.string().email().required().trim().label('default_email'),
    default_password: Joi.string().required().min(6).max(20).trim().label('default_password'),
    percentage: Joi.string().required().trim().label('percentage'),
    amount: Joi.string().required().trim().label('amount'),
    product_name: Joi.string().required().trim().label('product_name'),
  }),
};

module.exports = productSchema;
