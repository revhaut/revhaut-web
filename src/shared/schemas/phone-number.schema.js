import * as Joi from 'joi';
import { joiCustomPhoneNumberValidation } from '../utils/phone-number-validator';

const passwordSchema = Joi.string()
  .min(8)
  .trim()
  .label('Password');

const newPasswordSchema = Joi.string()
  .min(8)
  .trim()
  .label('New password');

const confirmPasswordSchema = Joi.string()
  .valid(Joi.ref('newPassword'))
  .trim()
  .label('Confirm password');

const emailSchema = Joi.string()
  .email()
  .trim()

const phoneNumberSchema = Joi.string()
  .trim()
  .regex(/^\d+$/)
  .message({ 'string.pattern.base': 'Phone number should consist of only numbers.' })
  .custom(joiCustomPhoneNumberValidation, 'Phone number validation');

export { phoneNumberSchema, emailSchema, confirmPasswordSchema, passwordSchema, newPasswordSchema };