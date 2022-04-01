const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const accountSchema = require('./schema/account.schema');
const accountService = require('./services');
const passwordUtil = require('../../shared/utils/generate-password');
const AccountService = require('../account/account.service');
class AccountController {
    async register(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(accountSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            data.password = passwordUtil.hashPassword(data.password);
            const { data: result, message } = await AccountService.create(data);
            //await emailService.sendVericationMail(authData);
            return HttpStatusCode.CREATED({ response, message, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async verifyUserAccount(request, response) {
        try {
            const { query } = request;
            const { errors, data } = schemaValidator(accountSchema.accountVerification, query);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            const { authData } = await accountService.verifyUserAccount(data);
            res.send(authData);
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async fetchUserAccounts(request, response) {
        const { query } = request;
        try {
            const { accountData, message } = await accountService.fetchUserAccounts(query);
            return HttpStatusCode.SUCCESS({ res, data: accountData, message });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }

    async vendore() {}
    async affiliate() {}
}

module.exports = new AccountController();