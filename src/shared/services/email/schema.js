const Joi =require('joi');

const emailSchema = Joi.object().keys({
  provider: Joi.string().required().label('Provider'),
  params: Joi.any().label('Params'),
});

module.exports =  emailSchema ;
