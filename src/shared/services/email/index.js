/* tslint:disable: no-return-await */
const  config = require('./config');
const EmailAdapter = require('./adapter');
const  emailSchema  = require('./schema');
const schemaValidator = require('../../../shared/utils/schema-validator.util');

const sendEmail = async request => {
    // add the provide - temporal
    request.provider = config.provider;

    const { errors, data } = schemaValidator(emailSchema, request);

    if (errors) {
        // return Response.INVALID_REQUEST({ response, errors });
        return { is_success: false, errors };
    }
    const { provider, params } = data;

    const adapter = EmailAdapter.getEmailAdatapter(provider);

    // return Response.SUCCESS({ response, await adapter.sendEmail(params) });
    return await adapter.sendEmail(params);
};

module.exports = sendEmail;