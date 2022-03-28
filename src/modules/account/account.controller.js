const HttpStatusCode = require('../../../src/shared/utils/response.formater');
const schemaValidator = require('../../../src/shared/utils/schema.validator');
const accountSchema = require('./schema/account.schema');
const accountService = require('./services');
const emailService = require('../../../src/shared/services/mail');
const hashPassword = require('../../../src/shared/utils/password.generator');

const createUserAccount = async(req, res) => {
    const { body } = req;
    try {
        const { errors, data } = schemaValidator(
            accountSchema.createAccountSchema, {
                ...body,
            }
        );
        if (errors) {
            return HttpStatusCode.INVALID_REQUEST({ res, errors });
        }
        data.password = hashPassword(data.password);
        const { authData, message } = await accountService.userRegistration(data);
        await emailService.sendVericationMail(authData);
        return HttpStatusCode.CREATED({ res, message, data: authData });
    } catch (error) {
        return HttpStatusCode.UNPROCCESSABLE_ENTITY({
            res,
            message: error.message,
        });
    }
};

const verifyUserAccount = async(req, res) => {
    try {
        const { query } = req;
        const { errors, data } = schemaValidator(
            accountSchema.accountVerification,
            query
        );
        if (errors) {
            return HttpStatusCode.INVALID_REQUEST({ res, errors });
        }
        const { authData } = await accountService.verifyUserAccount(data);
        res.send(authData);
    } catch (error) {
        return HttpStatusCode.UNPROCCESSABLE_ENTITY({
            res,
            message: error.message,
        });
    }
};

const fetchUserAccounts = async(req, res) => {
    const { query } = req;
    try {
        const { accountData, message } = await accountService.fetchUserAccounts(
            query
        );
        return HttpStatusCode.SUCCESS({ res, data: accountData, message });
    } catch (error) {
        return HttpStatusCode.UNPROCCESSABLE_ENTITY({
            res,
            message: error.message,
        });
    }
};

module.exports = { createUserAccount, verifyUserAccount, fetchUserAccounts };